import { lazy } from 'react';
import { authRoles } from 'app/auth';

const LaporanConfig = {
  settings: {
    layout: {}
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/laporan/list-agen',
      component: lazy(() => import('./LaporanListAgen'))
    },
    {
      path: '/laporan/list-transaksi-saldo',
      component: lazy(() => import('./LaporanListTransaksiSaldo'))
    },
    {
      path: '/laporan/list-kartu-paket-agen',
      component: lazy(() => import('./LaporanKartuPaketAgen'))
    }
  ]
};

export default LaporanConfig;
