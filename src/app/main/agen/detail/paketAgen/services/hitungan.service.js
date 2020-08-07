import { thousandSeparator } from 'app/Utils';
import * as JsPdf from 'jspdf';
import { startCase } from 'lodash';
import moment from 'moment';

class HitunganService {
  static printHitungan({ data, agen, listPaket, listBonus, total, hitungan }) {
    const title = `Hitung ${startCase(data.jenis)} Paket Agen ${agen?.no}. ${agen?.diri?.nama?.lengkap}`;
    const doc = new JsPdf().setProperties({ title: `Hitungan Agen ${agen?.no}. ${agen?.diri?.nama?.lengkap}` });
    const items = data?.items || [];
    doc.setFont('helvetica');
    doc.setFontSize(18);
    doc.setFontStyle('bold');
    doc.text(title, 10, 15);
    doc.setLineWidth(0.5);
    doc.line(10, 21, 200, 21);

    doc.setFontStyle('normal');
    doc.setFontSize(10);
    doc.text('Tanggal : ', 10, 35);
    doc.text(moment(data.tgl).format('DD-MM-YYYY'), 35, 35);

    doc.setFontStyle('bold');
    doc.text('1. Biaya Paket', 10, 45);
    doc.setFontStyle('normal');
    let y = 55;
    items.forEach(item => {
      const paketSelected = listPaket.find(paket => paket.id === item.paket);
      doc.text(`- ${paketSelected.nama}`, 15, y);
      doc.text(`Rp. ${thousandSeparator(paketSelected.harga)}`, 75, y);
      doc.text('X', 110, y);
      doc.text(`${thousandSeparator(item.jumlah)}`, 120, y);
      doc.text('=', 130, y);
      doc.text(`Rp. ${thousandSeparator(total.biaya[item.paket])}`, 140, y);

      y += 6;
    });

    doc.setFontStyle('bold');
    doc.text('Total Biaya : ', 100, y + 4);
    doc.text(`Rp. ${thousandSeparator(total.allBiaya)}`, 140, y + 4);

    doc.setFontStyle('bold');
    doc.text('2. Cashback Paket', 10, y + 14);
    doc.setFontStyle('normal');
    y += 24;
    items.forEach(item => {
      const paketSelected = listPaket.find(paket => paket.id === item.paket);
      doc.text(`- ${paketSelected.nama}`, 15, y);
      doc.text(`Rp. ${thousandSeparator(paketSelected.cashback)}`, 75, y);
      doc.text('X', 110, y);
      doc.text(`${thousandSeparator(item.jumlah)}`, 120, y);
      doc.text('=', 130, y);
      doc.text(`Rp. ${thousandSeparator(total.cashback[item.paket])}`, 140, y);

      y += 6;
    });

    doc.setFontStyle('bold');
    doc.text('Total Cashback : ', 100, y + 4);
    doc.text(`Rp. ${thousandSeparator(total.allCashback)}`, 140, y + 4);

    doc.setFontStyle('bold');
    doc.text('2. Bonus Paket', 10, y + 14);
    doc.setFontStyle('normal');
    y += 24;
    items.forEach(item => {
      const paketSelected = listPaket.find(paket => paket.id === item.paket);
      const bonusSelected = listBonus.find(bonus => bonus.paket === item.paket);
      doc.text(`- ${paketSelected.nama}`, 15, y);
      doc.text(`Rp. ${thousandSeparator(bonusSelected?.nominal)}`, 75, y);
      doc.text('X', 110, y);
      doc.text(`${thousandSeparator(item.jumlah)}`, 120, y);
      doc.text('=', 130, y);
      doc.text(`Rp. ${thousandSeparator(total.bonus[item.paket])}`, 140, y);

      y += 6;
    });

    doc.setFontStyle('bold');
    doc.text('Total Bonus : ', 100, y + 4);
    doc.text(`Rp. ${thousandSeparator(total.allBonus)}`, 140, y + 4);

    doc.setFontStyle('normal');
    doc.text(`Saldo akan ${data.jenis === 'booking' ? 'berkurang' : 'bertambah'} sebesar : `, 10, y + 20);
    doc.setFontStyle('bolditalic');
    doc.text(
      `Rp. ${thousandSeparator(total.allBiaya)} - (Rp. ${thousandSeparator(
        total.allCashback
      )} + Rp. ${thousandSeparator(total.allBonus)}) = Rp. ${thousandSeparator(hitungan)}`,
      15,
      y + 26
    );

    doc.output('dataurlnewwindow');
    // doc.save(`Hitung ${startCase(data.jenis)} Paket Agen ${agen?.no}. ${agen?.diri?.nama?.lengkap}.pdf`);
  }
}

export default HitunganService;
