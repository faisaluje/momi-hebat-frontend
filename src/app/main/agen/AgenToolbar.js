import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Icon, MenuItem, IconButton, Paper } from '@material-ui/core';
import { setTxtCariAgen, refreshListAgen, openAgenDialog, setStatusAgen, setLevelAgen } from './store/actions';
import AgenConfirmationDialog from './AgenConfirmationDialog';
import AgenStatus from './AgenStatus';

function AgenToolbar() {
  const dispatch = useDispatch();
  const { txtCari, status, data, level } = useSelector(({ agen }) => agen.table);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [pencarian, setPencarian] = React.useState(txtCari);

  const onTambahAgen = () => {
    setOpenConfirmation(true);
  };

  const submitPencarian = e => {
    if (e.key === 'Enter') {
      dispatch(setTxtCariAgen(pencarian));
    }
  };

  const onJenisSelected = jenisAgen => {
    setOpenConfirmation(false);
    if (jenisAgen) {
      dispatch(openAgenDialog(jenisAgen));
    }
  };

  return (
    <Paper elevation={3} className="p-8 w-full flex flex-wrap justify-between">
      <div className="flex flex-wrap items-center">
        <TextField
          label="Pencarian"
          placeholder="Ketik Disini..."
          size="small"
          variant="outlined"
          value={pencarian}
          onChange={event => setPencarian(event.target.value)}
          InputProps={{
            endAdornment: pencarian && (
              <IconButton size="small" onClick={() => setPencarian('')}>
                <Icon>close</Icon>
              </IconButton>
            )
          }}
          onKeyPress={submitPencarian}
        />

        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>search</Icon>}
          className="ml-0 sm:ml-8"
          onClick={() => dispatch(setTxtCariAgen(pencarian))}
        >
          Cari
        </Button>

        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>refresh</Icon>}
          className="ml-0 sm:ml-24"
          onClick={() => dispatch(refreshListAgen())}
        >
          Refresh
        </Button>
      </div>

      <div className="flex flex-wrap items-center">
        {data?.docs?.length > 0 && (
          <TextField
            label="Level"
            select
            size="small"
            variant="outlined"
            className="w-96 mr-0 sm:mr-24"
            value={level}
            onChange={event => dispatch(setLevelAgen(event.target.value))}
          >
            <MenuItem value="">Semua</MenuItem>
            <MenuItem value={1}>Level 1</MenuItem>
            <MenuItem value={2}>Level 2</MenuItem>
            <MenuItem value={3}>Level 3</MenuItem>
          </TextField>
        )}

        <TextField
          select
          variant="outlined"
          style={{ width: '12rem' }}
          size="small"
          label="Status Agen"
          value={status}
          onChange={event => dispatch(setStatusAgen(event.target.value))}
        >
          {Object.values(AgenStatus).map(item => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>

        <AgenConfirmationDialog open={openConfirmation} onClose={onJenisSelected} />
        <Button
          className="ml-0 sm:ml-12"
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>add</Icon>}
          onClick={onTambahAgen}
        >
          Tambah
        </Button>
      </div>
    </Paper>
  );
}

export default AgenToolbar;
