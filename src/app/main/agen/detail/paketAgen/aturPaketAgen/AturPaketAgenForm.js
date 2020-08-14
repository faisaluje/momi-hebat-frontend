import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useForm } from '@fuse/hooks';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Icon,
  makeStyles,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Alert } from '@material-ui/lab';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { closeDialog, openDialog, showMessage } from 'app/store/actions';
import { thousandSeparator } from 'app/Utils';
import clsx from 'clsx';
import React from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import HitunganService from '../services/hitungan.service';
import { createAturPaketAgen, setAturPaketAgenForm } from './store/actions';

const defaultFormState = {
  tgl: new Date(),
  jenis: 'booking',
  items: []
};

const defaultTotalState = {
  biaya: {},
  cashback: {},
  bonus: {}
};

function AturPaketAgenForm() {
  const dispatch = useDispatch();
  const { data, isError, msg, isLoading, jenis } = useSelector(({ aturPaketAgen }) => aturPaketAgen.form);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);
  const { data: dataPaket } = useSelector(({ paketAgen }) => paketAgen.table);
  const [listBonus, setListBonus] = React.useState([]);
  const [total, setTotal] = React.useState({ ...defaultTotalState });
  const [hitungan, setHitungan] = React.useState(0);
  const { form, setForm, setInForm } = useForm({ ...defaultFormState });
  const canBeSubmitted = !!form?.tgl && form?.items?.length > 0 && hitungan > 0;
  const saldoTotal = agen?.stok ? (agen.stok.saldo || 0) + (agen.stok.totalBonus || 0) : 0;

  React.useEffect(() => {
    if (data) {
      setForm(data);
    } else {
      setForm({
        tgl: new Date(),
        jenis,
        items: []
      });
    }
  }, [data, jenis, setForm]);

  React.useEffect(() => {
    if (agen?.stok?.bonusPakets) {
      setListBonus(agen?.stok?.bonusPakets);
    } else {
      setListBonus([]);
    }
  }, [agen]);

  React.useEffect(() => {
    if (form?.items && dataPaket && listBonus) {
      const biaya = {};
      const bonus = {};
      const cashback = {};
      const totalAll = { allBiaya: 0, allBonus: 0, allCashback: 0 };
      form.items.forEach(item => {
        const paketSelected = dataPaket.find(paket => paket._id === item.paket);
        const bonusSelected = listBonus.find(val => val.paket === item.paket);

        biaya[item.paket] = (item.jumlah || 0) * (paketSelected?.harga || 0);
        bonus[item.paket] = (item.jumlah || 0) * (bonusSelected?.nominal || 0);
        cashback[item.paket] = (item.jumlah || 0) * (paketSelected?.cashback || 0);

        totalAll.allBiaya += biaya[item.paket];
        totalAll.allBonus += bonus[item.paket];
        totalAll.allCashback += cashback[item.paket];
      });

      setTotal({ biaya, bonus, cashback, ...totalAll });
      setHitungan(totalAll.allBiaya - (totalAll.allBonus + totalAll.allCashback));
    }
  }, [listBonus, dataPaket, form]);

  React.useEffect(() => {
    if (!isLoading && !isError && msg) {
      dispatch(
        showMessage({
          message: msg, // text or html
          autoHideDuration: 6000, // ms
          anchorOrigin: {
            vertical: 'top', // top bottom
            horizontal: 'center' // left center right
          },
          variant: 'success' // success error info warning null
        })
      );
    }
  }, [agen.id, dispatch, isError, isLoading, msg]);

  const handleJumlahChange = (paket, jumlah) => {
    const itemIdx = form?.items.length > 0 ? form.items.findIndex(item => item.paket === paket._id) : -1;
    const newForm = { ...form };

    if (itemIdx < 0) {
      newForm.items.push({ paket: paket._id, jumlah });
    } else {
      newForm.items[itemIdx].jumlah = jumlah;
    }

    setForm({ ...newForm });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Konfirmasi</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">Apakan anda sudah yakin ?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => dispatch(closeDialog())}>Tidak</Button>
              <Button onClick={() => onSubmit()} autoFocus>
                Iya
              </Button>
            </DialogActions>
          </>
        )
      })
    );
  };

  const onSubmit = () => {
    const newForm = {
      ...form,
      jenis,
      agen: agen.id
    };

    dispatch(setAturPaketAgenForm(newForm));
    dispatch(createAturPaketAgen({ ...newForm }));
    dispatch(closeDialog());
  };

  const cetakHitungan = () => {
    const newForm = {
      ...form,
      jenis,
      agen: agen.id
    };
    HitunganService.printHitungan({ data: newForm, total, hitungan, agen, listPaket: dataPaket, listBonus });
  };

  return (
    <>
      <Dialog classes={{ paper: 'rounded-8 p-24' }} open={isLoading} disableEscapeKeyDown disableBackdropClick>
        <div className="flex flex-col justify-center text-center items-center h-full p-16">
          <CircularProgress />
          <Typography className="mt-8">Sedang memproses. . .</Typography>
        </div>
      </Dialog>
      <form onSubmit={handleSubmit} className="flex flex-col overflow-auto">
        <DialogContent classes={{ root: 'p-24' }} dividers>
          <FuseAnimateGroup
            enter={{
              animation: 'transition.whirlIn',
              delay: 200,
              duration: 500
            }}
          >
            {isError && (
              <div className="flex mb-16">
                <Paper className="w-full bg-red-500 p-8 text-white">{msg || 'Gagal menyimpan'}</Paper>
              </div>
            )}

            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">Tgl Transaksi:</Typography>

              <KeyboardDatePicker
                autoOk
                variant="inline"
                invalidDateMessage="Tanggal tidak valid"
                format="DD-MM-YYYY"
                value={form.tgl}
                onChange={date => setInForm('tgl', date?.toDate() || null)}
                readOnly={!!data?.id}
                InputProps={{
                  readOnly: !!data?.id
                }}
              />
            </div>

            <div className="flex flex-row mb-16">
              <div>
                <ExpansionPanel id="panel-biaya" elevation={5} defaultExpanded>
                  <ExpansionPanelSummary
                    className="border-b border-solid border-black min-h-52 h-52"
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography className="font-bold">Biaya</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="flex flex-col">
                    <div className="flex flex-row mb-16">
                      <Typography className="font-bold w-216">Pilihan Paket</Typography>
                      <Typography className="font-bold w-160">Harga Satuan</Typography>
                      <Typography className="font-bold" style={{ width: '13rem' }}>
                        Jumlah
                      </Typography>
                      <Typography className="font-bold">Total</Typography>
                    </div>

                    {dataPaket.length > 0 &&
                      dataPaket.map((paket, idx) => {
                        const paketSelected =
                          form?.items?.length > 0 ? form.items.find(item => item.paket === paket._id) : undefined;
                        const biaya = total.biaya[paket._id];

                        const bgColor = paket.bgColor || '#FFF';
                        const style = makeStyles(theme => ({
                          root: {
                            background: bgColor,
                            color: theme.palette.getContrastText(bgColor)
                          }
                        }));

                        return (
                          <div key={idx} className={clsx(style().root, 'flex flex-row py-4')}>
                            <Typography style={{ width: '22.4rem' }}>
                              <b>-</b> {paket.nama}
                            </Typography>
                            <Typography style={{ width: '14rem' }}>Rp. {thousandSeparator(paket.harga)}</Typography>
                            <NumberFormat
                              id={`jumlah-paket-${paket._id}`}
                              className="mr-32 w-72 h-0"
                              value={paketSelected?.jumlah || ''}
                              onValueChange={val => handleJumlahChange(paket, val.value)}
                              customInput={TextField}
                              thousandSeparator="."
                              decimalSeparator=","
                              size="small"
                              allowNegative={false}
                              autoFocus={idx === 0}
                              inputProps={{
                                className: style().root
                              }}
                              // eslint-disable-next-line react/jsx-no-duplicate-props
                              InputProps={{
                                readOnly: !!data?.id
                              }}
                            />
                            <Typography>{biaya ? `Rp. ${thousandSeparator(biaya)}` : '-'}</Typography>
                          </div>
                        );
                      })}

                    <div className="flex flex-row mt-16">
                      <Typography className="font-bold text-right pr-64" style={{ width: '46.5rem' }}>
                        Total Biaya :{' '}
                      </Typography>
                      <Typography className="font-bold">Rp. {thousandSeparator(total.allBiaya)}</Typography>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>

              <div className="mx-20" />

              <div>
                <ExpansionPanel id="panel-cashback" elevation={5} defaultExpanded>
                  <ExpansionPanelSummary
                    className="border-b border-solid border-black min-h-52 h-52"
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography className="font-bold">Cashback</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="flex flex-col">
                    <div className="flex flex-row mb-16">
                      <Typography className="font-bold w-216">Pilihan Paket</Typography>
                      <Typography className="font-bold w-160">Cashback Satuan</Typography>
                      <Typography className="font-bold w-160">Jumlah</Typography>
                      <Typography className="font-bold">Total</Typography>
                    </div>

                    {dataPaket.length > 0 &&
                      dataPaket.map((paket, idx) => {
                        const paketSelected =
                          form?.items?.length > 0 ? form.items.find(item => item.paket === paket._id) : undefined;
                        const cashback = total.cashback[paket._id];

                        const bgColor = paket.bgColor || '#FFF';
                        const style = makeStyles(theme => ({
                          root: {
                            background: bgColor,
                            color: theme.palette.getContrastText(bgColor)
                          }
                        }));

                        return (
                          <div key={idx} className={clsx(style().root, 'flex flex-row py-4')}>
                            <Typography style={{ width: '22.4rem' }}>
                              <b>-</b> {paket.nama}
                            </Typography>
                            <Typography style={{ width: '16rem' }}>Rp. {thousandSeparator(paket.cashback)}</Typography>
                            <Typography style={{ width: '11rem' }}>{paketSelected?.jumlah || '-'}</Typography>
                            <Typography>{cashback ? `Rp. ${thousandSeparator(cashback)}` : '-'}</Typography>
                          </div>
                        );
                      })}

                    <div className="flex flex-row mt-16">
                      <Typography className="font-bold text-right pr-64" style={{ width: '49.4rem' }}>
                        Total Cashback :{' '}
                      </Typography>
                      <Typography className="font-bold">Rp. {thousandSeparator(total.allCashback)}</Typography>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </div>

            <div className="flex flex-wrap mb-16">
              <div>
                <ExpansionPanel id="panel-bonus" elevation={5} defaultExpanded>
                  <ExpansionPanelSummary
                    className="border-b border-solid border-black min-h-52 h-52"
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography className="font-bold">Bonus</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="flex flex-col">
                    <div className="flex flex-row mb-16">
                      <Typography className="font-bold w-216">Pilihan Paket</Typography>
                      <Typography className="font-bold w-160">Bonus Satuan</Typography>
                      <Typography className="font-bold" style={{ width: '13rem' }}>
                        Jumlah
                      </Typography>
                      <Typography className="font-bold">Total</Typography>
                    </div>

                    {dataPaket.length > 0 &&
                      dataPaket.map((paket, idx) => {
                        const bonusSelected = listBonus.find(item => item.paket === paket._id);
                        const paketSelected =
                          form?.items?.length > 0 ? form.items.find(item => item.paket === paket._id) : undefined;
                        const bonus = total.bonus[paket._id];

                        const bgColor = paket.bgColor || '#FFF';
                        const style = makeStyles(theme => ({
                          root: {
                            background: bgColor,
                            color: theme.palette.getContrastText(bgColor)
                          }
                        }));

                        return (
                          <div key={idx} className={clsx(style().root, 'flex flex-row py-4')}>
                            <Typography style={{ width: '22.4rem' }}>
                              <b>-</b> {paket.nama}
                            </Typography>
                            <Typography style={{ width: '16rem' }}>
                              Rp. {thousandSeparator(bonusSelected?.nominal)}
                            </Typography>
                            <Typography style={{ width: '9rem' }}>{paketSelected?.jumlah || '-'}</Typography>
                            <Typography>{bonus ? `Rp. ${thousandSeparator(bonus)}` : '-'}</Typography>
                          </div>
                        );
                      })}

                    <div className="flex flex-row mt-16">
                      <Typography className="font-bold text-right pr-64" style={{ width: '49.4rem' }}>
                        Total Bonus :{' '}
                      </Typography>
                      <Typography className="font-bold">Rp. {thousandSeparator(total.allBonus)}</Typography>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>

              <div className="mx-20" />

              <div className="flex flex-col">
                <ExpansionPanel id="panel-total" elevation={5} defaultExpanded>
                  <ExpansionPanelSummary
                    className="border-b border-solid border-black min-h-52 h-52"
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography className="font-bold">Hitungan</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="flex flex-col">
                    <div className="flex mb-8">
                      <Typography className="w-288">Biaya : </Typography>
                      <Typography className="font-bold text-14">Rp. {thousandSeparator(total.allBiaya)}</Typography>
                    </div>

                    <div className="flex mb-8">
                      <Typography className="w-288">Cashback : </Typography>
                      <Typography className="font-bold text-14">Rp. {thousandSeparator(total.allCashback)}</Typography>
                    </div>

                    <div className="flex mb-8">
                      <Typography className="w-288">Bonus : </Typography>
                      <Typography className="font-bold text-14">Rp. {thousandSeparator(total.allBonus)}</Typography>
                    </div>

                    <div className="flex mb-8 mt-20">
                      <Typography className="italic w-288">
                        Saldo Agen akan {jenis === 'booking' ? 'berkurang' : 'bertambah'} sebesar :{' '}
                      </Typography>
                      <Typography className="font-bold italic text-14">Rp. {thousandSeparator(hitungan)}</Typography>
                    </div>

                    {!data?.id && (
                      <div className="flex mb-8">
                        <Typography className="italic w-288">Total Saldo saat ini :</Typography>
                        <Typography className="font-bold italic text-14">
                          Rp. {thousandSeparator(saldoTotal)}
                        </Typography>
                      </div>
                    )}

                    {!data?.id && (
                      <div className="flex mb-8 mt-20">
                        <Typography className="italic w-288">Total Saldo Setelah Hitungan : </Typography>
                        <Typography className="font-bold italic text-14">
                          Rp. {thousandSeparator(jenis === 'booking' ? saldoTotal - hitungan : saldoTotal + hitungan)}
                        </Typography>
                      </div>
                    )}
                  </ExpansionPanelDetails>
                </ExpansionPanel>

                {jenis === 'cancel' && (
                  <Typography className="italic">
                    *) Catatan: Jika bonus sudah diberkan semua, <br /> maka agen harus mengembalikan bonus terlebih
                    dahulu sebesar <b className="text-14">Rp. {thousandSeparator(total.allBonus)}</b>
                  </Typography>
                )}
              </div>
            </div>
          </FuseAnimateGroup>
        </DialogContent>

        <DialogActions
          className={`flex ${!data?.id ? 'flex-row' : 'flex-row-reverse'} justify-between items-center border-t`}
        >
          {!data?.id && (
            <>
              {jenis === 'booking' && saldoTotal - hitungan < 0 && (
                <Alert variant="outlined" severity="error" className="font-bold text-14">
                  Saldo Tidak mencukupi
                </Alert>
              )}
              <div className="mx-8" />
            </>
          )}
          <div className="flex flex-row">
            <Button
              disabled={!canBeSubmitted}
              variant="contained"
              color="primary"
              onClick={() => cetakHitungan()}
              startIcon={<Icon>print</Icon>}
            >
              Cetak Hitungan
            </Button>

            <div className="mx-8" />

            {!data?.id && (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!canBeSubmitted || (jenis === 'booking' && saldoTotal - hitungan < 0)}
              >
                Proses
              </Button>
            )}
          </div>
        </DialogActions>
      </form>
    </>
  );
}

export default AturPaketAgenForm;
