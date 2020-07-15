import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import MenuConfig from 'app/main/menu/MenuConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import PenggunaConfig from 'app/main/pengguna/PenggunaConfig';
import PeriodeConfig from 'app/main/periode/PeriodeConfig';
import AgenConfig from 'app/main/agen/AgenConfig';
import DetailAgenConfig from 'app/main/agen/detail/DetailAgenConfig';
import SaldoConfig from 'app/main/saldo/SaldoConfig';
import BarangConfig from 'app/main/barang/BarangConfig';
import PaketConfig from 'app/main/paket/PaketConfig';
import PackingConfig from 'app/main/packing/PackingConfig';
import KartuPaketConfig from 'app/main/kartuPaket/KartuPaketConfig';

const routeConfigs = [
  LoginConfig,
  MenuConfig,
  PenggunaConfig,
  PeriodeConfig,
  DetailAgenConfig,
  AgenConfig,
  SaldoConfig,
  BarangConfig,
  PaketConfig,
  PackingConfig,
  KartuPaketConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/menu" />
  }
];

export default routes;
