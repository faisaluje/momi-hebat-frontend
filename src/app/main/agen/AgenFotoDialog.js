import { Button, CircularProgress, Dialog, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { URL_BACKEND, URL_API } from 'app/Constants';
import { showMessage } from 'app/store/actions';
import Axios from 'axios';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  productImageFeaturedStar: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0
  },
  productImageUpload: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut
  },
  productImageItem: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:hover': {
      '& $productImageFeaturedStar': {
        opacity: 0.8
      }
    },
    '&.featured': {
      pointerEvents: 'none',
      boxShadow: theme.shadows[3],
      '& $productImageFeaturedStar': {
        opacity: 1
      },
      '&:hover $productImageFeaturedStar': {
        opacity: 1
      }
    }
  }
}));

function AgenFotoDialog(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const { data } = useSelector(({ agen }) => agen.form);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = () => {
    if (!isLoading) {
      setIsOpen(false);
    }
  };

  const showFuseMessage = (message, variant) =>
    showMessage({
      message, // text or html
      autoHideDuration: 6000, // ms
      anchorOrigin: {
        vertical: 'top', // top bottom
        horizontal: 'center' // left center right
      },
      variant // success error info warning null
    });

  const handleUploadChange = e => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (file.size > 2e6) {
      dispatch(showFuseMessage('Ukuran file maks 2MB', 'error'));
    } else {
      const formData = new FormData();
      formData.append('foto', file);

      setIsLoading(true);
      Axios.post(`${URL_API}/agen/profile-photo/${data.id}`, formData, {
        timeout: 60000
      })
        .then(() => {
          dispatch(showFuseMessage('Foto Agen berhasil dirubah', 'success'));
        })
        .finally(() => {
          setIsLoading(false);
          handleClose();
        });
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setIsOpen(true)}>
        Ganti Foto
      </Button>

      <Dialog classes={{ paper: 'rounded-8' }} open={isOpen} onClose={handleClose}>
        {!isLoading ? (
          <Tooltip arrow classes={{ tooltip: 'text-14' }} title="Klik untuk mengganti foto">
            <label
              htmlFor="button-file"
              className={clsx(
                classes.productImageUpload,
                'flex items-center justify-center relative w-256 h-320 rounded-4 m-8 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
              )}
            >
              <input accept="image/*" className="hidden" id="button-file" type="file" onChange={handleUploadChange} />
              <img
                className="max-w-none w-auto h-full"
                src={`${URL_BACKEND}/profile-pictures/${data.id}.jpg?${new Date().getTime()}`}
                alt="profile"
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = `${URL_BACKEND}/profile-pictures/profile.jpg`;
                }}
              />
            </label>
          </Tooltip>
        ) : (
          <div className="flex flex-col justify-center text-center items-center h-full p-16">
            <CircularProgress />
            <Typography className="mt-8">Sedang memproses. . .</Typography>
          </div>
        )}
      </Dialog>
    </>
  );
}

export default AgenFotoDialog;
