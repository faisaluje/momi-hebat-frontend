import JsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import AgenService from './agen.service';

class PrintAgenService {
  static async getListAgen(params) {
    const listAgen = await AgenService.getListAgenData(params);
    if (listAgen?.data?.docs.length < 1) {
      return [];
    }

    const newListAgen = listAgen.data.docs.map((agen, idx) => ({
      no: idx + 1,
      noAgen: agen.no,
      nama: agen.diri?.nama?.lengkap,
      ttl: `${agen.diri?.lahir?.tempat || '-'}${
        agen.diri?.lahir?.tanggal ? `, ${moment(agen.diri?.lahir?.tanggal).format('DD-MM-YYYY')}` : ''
      }`,
      alamat: `${agen.diri.alamat?.jalan || '-'}${agen.diri.alamat?.rt ? `, RT ${agen.diri.alamat?.rt}` : ''}${
        agen.diri.alamat?.rw ? `, RW ${agen.diri.alamat?.rw}` : ''
      }${agen.diri.alamat?.kelurahan ? `, Kel. ${agen.diri.alamat?.kelurahan}` : ''}${
        agen.diri.alamat?.kecamatan ? `, Kec. ${agen.diri.alamat?.kecamatan}` : ''
      }${agen.diri.alamat?.kabKota ? `, Kab/Kota ${agen.diri.alamat?.kabKota}` : ''}`,
      topAgen: agen.topAgen ? `${agen.topAgen.no}. ${agen.topAgen.diri?.nama?.lengkap}` : '-',
      tlp: agen.diri?.noTlp || '-'
    }));

    return newListAgen;
  }

  static async printListAgen(params) {
    const doc = new JsPDF();
    doc.setFont('helvetica');

    doc.text(`DATA AGEN ${params.status.toUpperCase()}`, 10, 10);
    doc.setFontSize(10);
    doc.text(`Level :  ${params.level || 'Semua'}`, 10, 16);

    JsPDF.autoTableSetDefaults(
      {
        headStyles: { fillColor: [179, 0, 10] }
      },
      doc
    );

    const body = await this.getListAgen(params);
    const totalPagesExp = '{total_pages_count_string}';

    doc.autoTable({
      startY: 20,
      margin: { left: 10, right: 10 },
      columns: [
        { dataKey: 'no', header: 'No.' },
        { dataKey: 'noAgen', header: 'No. Agen' },
        { dataKey: 'nama', header: 'Nama' },
        { dataKey: 'ttl', header: 'TTL' },
        { dataKey: 'alamat', header: 'Alamat' },
        { dataKey: 'topAgen', header: 'Agen Referral' },
        { dataKey: 'tlp', header: 'Telepon' }
      ],
      body,
      showHead: 'everyPage',
      didDrawPage(data) {
        // Footer
        let str = `Halaman ${doc.internal.getNumberOfPages()}`;
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
          str = `${str} dari ${totalPagesExp}`;
        }
        doc.setFontSize(8);

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        const { pageSize } = doc.internal;
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      }
    });

    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }

    doc.output('dataurlnewwindow');
  }
}

export default PrintAgenService;
