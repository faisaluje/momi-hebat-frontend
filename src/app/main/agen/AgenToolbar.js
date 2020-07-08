import React from 'react';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Icon, MenuItem } from '@material-ui/core';
import { setTxtCariAgen, refreshListAgen, openAgenDialog, setStatusAgen, setLevelAgen } from './store/actions';
import AgenConfirmationDialog from './AgenConfirmationDialog';
import AgenStatus from './AgenStatus';

function AgenToolbar() {
  const dispatch = useDispatch();
  const { txtCari, status, data, level } = useSelector(({ agen }) => agen.table);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);

  const onTambahAgen = () => {
    setOpenConfirmation(true);
  };

  const onJenisSelected = jenisAgen => {
    setOpenConfirmation(false);
    if (jenisAgen) {
      dispatch(openAgenDialog(jenisAgen));
    }
  };

  return (
    <div className="m-8 mr-0 w-full flex flex-wrap justify-between">
      <div className="flex flex-wrap items-center">
        <TextField
          label="Pencarian"
          color="secondary"
          placeholder="Ketik Disini..."
          value={txtCari}
          onChange={event => dispatch(setTxtCariAgen(event.target.value))}
        />

        {data?.length > 0 && (
          <TextField
            label="Level Agen"
            select
            className="w-80 ml-0 sm:ml-24"
            color="secondary"
            value={level}
            onChange={event => dispatch(setLevelAgen(event.target.value))}
          >
            <MenuItem value="">Semua</MenuItem>
            {Object.keys(_.groupBy(data, 'level')).map(item => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        )}

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
        <TextField
          select
          classes={{ root: 'w-96' }}
          color="secondary"
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
    </div>
  );
}

export default AgenToolbar;
