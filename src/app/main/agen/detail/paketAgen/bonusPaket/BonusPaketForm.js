/* eslint-disable radix */
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useForm } from '@fuse/hooks';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { closeDialog, openDialog, showMessage } from 'app/store/actions';
import { thousandSeparator } from 'app/Utils';
import clsx from 'clsx';
import React from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { saveBonusPaket } from '../store/actions';

function BonusPaketForm() {
  const dispatch = useDispatch();
  const { isLoading, isError, msg } = useSelector(({ paketAgen }) => paketAgen.bonus);
  const { data } = useSelector(({ paketAgen }) => paketAgen.table);
  const { agen } = useSelector(({ detailAgen }) => detailAgen.panel);
  const { form, setForm, setInForm } = useForm(null);

  React.useEffect(() => {
    if (agen) {
      setForm({ ...agen.stok });
    }
  }, [agen, setForm]);

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
  }, [dispatch, isError, isLoading, msg]);

  const handleChangeNominal = (bonus, idx = undefined) => {
    if (typeof idx === 'number') {
      setInForm(`bonusPakets[${idx}].nominal`, bonus.nominal);
    } else {
      const newBonusPakets = [...(form.bonusPakets || []), bonus];
      setForm({
        ...form,
        bonusPakets: newBonusPakets
      });
    }
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
    dispatch(saveBonusPaket({ ...form }));
    dispatch(closeDialog());
  };

  let totalBonusPaket = 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col overflow-auto">
      <DialogContent classes={{ root: 'p-24' }}>
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

          <div className="flex flex-row mb-16">
            <Typography className="font-bold w-400">Nama Paket</Typography>
            <Typography className="font-bold" style={{ width: '17rem' }}>
              Bonus
            </Typography>
            <Typography className="font-bold w-160">Stok Tersedia</Typography>
            <Typography className="font-bold">Total</Typography>
          </div>

          {data?.map(paket => {
            let bonusPaket = form?.bonusPakets?.find(item => item.paket === paket._id);
            const idx = bonusPaket ? form.bonusPakets.findIndex(item => item.paket === paket._id) : undefined;
            if (!bonusPaket) {
              bonusPaket = { paket: paket._id };
            }

            const paketSelected = form?.pakets?.find(item => item.paket === paket._id);
            const stok = paketSelected?.jumlah || 0;

            const bonus = (bonusPaket?.nominal || 0) * stok;
            totalBonusPaket += bonus;

            const bgColor = paket.bgColor || '#FFF';
            const style = makeStyles(theme => ({
              root: {
                background: bgColor,
                color: theme.palette.getContrastText(bgColor)
              }
            }));

            return (
              <div key={paket._id} className={clsx(style().root, 'flex flex-row py-8 w-full items-center')}>
                <Typography className="w-360 font-bold ">- {paket.nama}</Typography>

                <NumberFormat
                  className="w-160"
                  id={`nominal-bonus-${paket._id}`}
                  prefix="Rp. "
                  size="small"
                  value={bonusPaket?.nominal || ''}
                  onValueChange={val =>
                    handleChangeNominal(
                      {
                        ...bonusPaket,
                        nominal: val.value
                      },
                      idx
                    )
                  }
                  customInput={TextField}
                  thousandSeparator="."
                  decimalSeparator=","
                  inputProps={{
                    className: style().root
                  }}
                />

                <div className="flex flex-row w-136 mx-32">
                  X <div className="mx-12 w-88 text-center">{stok}</div> =
                </div>

                <Typography className="w-160">Rp. {thousandSeparator(bonus)}</Typography>
              </div>
            );
          })}

          <div className="flex flex-row mt-40">
            <Typography className="font-bold text-right pr-80 text-14" style={{ width: '72rem' }}>
              TOTAL:
            </Typography>
            <Typography className="font-bold text-14">Rp. {thousandSeparator(totalBonusPaket)}</Typography>
          </div>
        </FuseAnimateGroup>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="primary" type="submit">
          Simpan
        </Button>
      </DialogActions>
    </form>
  );
}

export default BonusPaketForm;
