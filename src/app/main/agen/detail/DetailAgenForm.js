import React from 'react';
import { Typography, makeStyles, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light)
  }
}));

function DetailAgenForm(props) {
  const classes = useStyles(props);
  const { agen, isLoading, saldo } = useSelector(({ detailAgen }) => detailAgen.panel);

  return (
    <FuseAnimateGroup
      enter={{
        animation: 'transition.slideDownIn',
        delay: 200,
        duration: 500
      }}
      style={{
        height: '25%'
      }}
      className={clsx(classes.root, 'flex flex-wrap justify-between overflow-auto w-full')}
    >
      <div className="flex flex-col overflow-auto">
        <div className="flex mb-16">
          <Typography className="min-w-160 font-bold">No. Agen:</Typography>

          <Typography>{agen?.no || '-'}</Typography>
          {agen?.topAgen && (
            <Typography className="ml-24">
              (Agen Referral : <b>{agen.topAgen.diri?.nama?.lengkap || '-'}</b>)
            </Typography>
          )}
        </div>

        <div className="flex mb-16">
          <Typography className="min-w-160 font-bold">Nama:</Typography>

          <Typography>{agen?.diri?.nama?.lengkap || '-'}</Typography>
          {agen?.diri?.nama?.panggilan && <Typography className="ml-24">({agen.diri.nama.panggilan})</Typography>}
        </div>

        <div className="flex mb-16">
          <Typography className="min-w-160 font-bold">Alamat:</Typography>

          <Typography>{agen?.diri?.alamat?.jalan || '-'}</Typography>
        </div>

        <div className="flex mb-16">
          <Typography className="min-w-160 font-bold">No Telp.:</Typography>

          <Typography>{agen?.diri?.noTlp || '-'}</Typography>
        </div>
      </div>
      <div className="flex flex-col overflow-auto">
        <Typography className="font-bold text-20">Total Saldo :</Typography>
        {isLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <NumberFormat
            className="text-20 font-bold"
            decimalSeparator=","
            value={saldo ? saldo.jumlah + saldo.bonus : 0}
            displayType="text"
            thousandSeparator="."
            prefix="Rp. "
          />
        )}
      </div>
    </FuseAnimateGroup>
  );
}

export default DetailAgenForm;
