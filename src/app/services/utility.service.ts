import { DomSanitizer } from '@angular/platform-browser';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class UtilityService {

  constructor(private sanitizer: DomSanitizer, private router: Router) { }

  public apresentaMensagem(title: string, message: string, typeIconAlert: SweetAlertIcon, url: string, navigate: boolean = true) {
    Swal.fire(title, message, typeIconAlert).then((swal_result) => {
      if (swal_result.value && navigate)
        this.router.navigate([url]);

    });

  }
  public GetFirstName(name: string) {

    if (!name) {
      return '';
    }

    const arrName = name.split(' ');
    if (arrName.length === 1) {
      return name;
    } else {
      return arrName[0];
    }
  }



  public GetLastName(name: string) {

    if (!name) {
      return '';
    }

    const arrName = name.split(' ');
    if (arrName.length === 1) {
      return name;
    } else {
      return arrName[arrName.length - 1];
    }
  }

  public SetFocus(selectors: string) {
    const fields = document.querySelectorAll(selectors);
    if (fields.length > 0) {
      const firstField: any = fields[0];
      window.setTimeout(function () {
        firstField.focus();
      }, 0);
    }
  }

  public IsMobile() {
    let check = false;
    // tslint:disable-next-line:max-line-length
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) { check = true; } })(navigator.userAgent || navigator.vendor);
    return check;
  }

  public Sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }


  public TitleCase(str: string) {
    return str.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  }





  public copyToClipboard(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  public GetChartColors(qtd: number) {
    const colors2 = ['#69d2e7', '#f38630', '#fc9d9a', '#83af9b', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    // tslint:disable-next-line:max-line-length
    const colors = ['#a7dbd8', '#e0e4cc', '#fa6900', '#fe4365', '#f9cdad', '#c8c8a9', , '#ecd078', '#d95b43', '#c02942', '#542437', '#53777a', '#556270', '#4ecdc4', '#c7f464', '#ff6b6b', '#c44d58', '#774f38', '#e08e79', '#f1d4af', '#ece5ce', '#c5e0dc', '#e8ddcb', '#cdb380', '#036564', '#033649', '#031634', '#490a3d', '#bd1550', '#e97f02', '#f8ca00', '#8a9b0f', '#594f4f', '#547980', '#45ada8', '#9de0ad', '#e5fcc2', '#00a0b0', '#6a4a3c', '#cc333f', '#eb6841', '#edc951', '#e94e77', '#d68189', '#c6a49a', '#c6e5d9', '#f4ead5', '#3fb8af', '#7fc7af', '#dad8a7', '#ff9e9d', '#ff3d7f', '#d9ceb2', '#948c75', '#d5ded9', '#7a6a53', '#99b2b7', '#ffffff', '#cbe86b', '#f2e9e1', '#1c140d', '#cbe86b', '#efffcd', '#dce9be', '#555152', '#2e2633', '#99173c', '#343838', '#005f6b', '#008c9e', '#00b4cc', '#00dffc', '#413e4a', '#73626e', '#b38184', '#f0b49e', '#f7e4be', '#ff4e50', '#fc913a', '#f9d423', '#ede574', '#e1f5c4', '#99b898', '#fecea8', '#ff847c', '#e84a5f', '#2a363b', '#655643', '#80bca3', '#f6f7bd', '#e6ac27', '#bf4d28', '#00a8c6', '#40c0cb', '#f9f2e7', '#aee239', '#8fbe00', '#351330', '#424254', '#64908a', '#e8caa4', '#cc2a41', '#554236', '#f77825', '#d3ce3d', '#f1efa5', '#60b99a', '#ff9900', '#424242', '#e9e9e9', '#bcbcbc', '#3299bb', '#5d4157', '#838689', '#a8caba', '#cad7b2', '#ebe3aa', '#8c2318', '#5e8c6a', '#88a65e', '#bfb35a', '#f2c45a', '#fad089', '#ff9c5b', '#f5634a', '#ed303c', '#3b8183', '#ff4242', '#f4fad2', '#d4ee5e', '#e1edb9', '#f0f2eb', '#d1e751', '#ffffff', '#000000', '#4dbce9', '#26ade4', '#f8b195', '#f67280', '#c06c84', '#6c5b7b', '#355c7d', '#1b676b', '#519548', '#88c425', '#bef202', '#eafde6', '#bcbdac', '#cfbe27', '#f27435', '#f02475', '#3b2d38', '#5e412f', '#fcebb6', '#78c0a8', '#f07818', '#f0a830', '#452632', '#91204d', '#e4844a', '#e8bf56', '#e2f7ce', '#eee6ab', '#c5bc8e', '#696758', '#45484b', '#36393b', '#f0d8a8', '#3d1c00', '#86b8b1', '#f2d694', '#fa2a00', '#f04155', '#ff823a', '#f2f26f', '#fff7bd', '#95cfb7', '#2a044a', '#0b2e59', '#0d6759', '#7ab317', '#a0c55f', '#bbbb88', '#ccc68d', '#eedd99', '#eec290', '#eeaa88', '#b9d7d9', '#668284', '#2a2829', '#493736', '#7b3b3b', '#b3cc57', '#ecf081', '#ffbe40', '#ef746f', '#ab3e5b', '#a3a948', '#edb92e', '#f85931', '#ce1836', '#009989', '#67917a', '#170409', '#b8af03', '#ccbf82', '#e33258', '#e8d5b7', '#0e2430', '#fc3a51', '#f5b349', '#e8d5b9', '#aab3ab', '#c4cbb7', '#ebefc9', '#eee0b7', '#e8caaf', '#300030', '#480048', '#601848', '#c04848', '#f07241', '#ab526b', '#bca297', '#c5ceae', '#f0e2a4', '#f4ebc3', '#607848', '#789048', '#c0d860', '#f0f0d8', '#604848', '#a8e6ce', '#dcedc2', '#ffd3b5', '#ffaaa6', '#ff8c94', '#3e4147', '#fffedf', '#dfba69', '#5a2e2e', '#2a2c31', '#b6d8c0', '#c8d9bf', '#dadabd', '#ecdbbc', '#fedcba', '#fc354c', '#29221f', '#13747d', '#0abfbc', '#fcf7c5', '#1c2130', '#028f76', '#b3e099', '#ffeaad', '#d14334', '#edebe6', '#d6e1c7', '#94c7b6', '#403b33', '#d3643b', '#cc0c39', '#e6781e', '#c8cf02', '#f8fcc1', '#1693a7', '#dad6ca', '#1bb0ce', '#4f8699', '#6a5e72', '#563444', '#a7c5bd', '#e5ddcb', '#eb7b59', '#cf4647', '#524656', '#fdf1cc', '#c6d6b8', '#987f69', '#e3ad40', '#fcd036', '#5c323e', '#a82743', '#e15e32', '#c0d23e', '#e5f04c', '#230f2b', '#f21d41', '#ebebbc', '#bce3c5', '#82b3ae', '#b9d3b0', '#81bda4', '#b28774', '#f88f79', '#f6aa93', '#3a111c', '#574951', '#83988e', '#bcdea5', '#e6f9bc', '#5e3929', '#cd8c52', '#b7d1a3', '#dee8be', '#fcf7d3', '#1c0113', '#6b0103', '#a30006', '#c21a01', '#f03c02', '#382f32', '#ffeaf2', '#fcd9e5', '#fbc5d8', '#f1396d', '#e3dfba', '#c8d6bf', '#93ccc6', '#6cbdb5', '#1a1f1e', '#000000', '#9f111b', '#b11623', '#292c37', '#cccccc', '#c1b398', '#605951', '#fbeec2', '#61a6ab', '#accec0', '#8dccad', '#988864', '#fea6a2', '#f9d6ac', '#ffe9af', '#f6f6f6', '#e8e8e8', '#333333', '#990100', '#b90504', '#1b325f', '#9cc4e4', '#e9f2f9', '#3a89c9', '#f26c4f', '#5e9fa3', '#dcd1b4', '#fab87f', '#f87e7b', '#b05574', '#951f2b', '#f5f4d7', '#e0dfb1', '#a5a36c', '#535233', '#413d3d', '#040004', '#c8ff00', '#fa023c', '#4b000f', '#eff3cd', '#b2d5ba', '#61ada0', '#248f8d', '#605063', '#2d2d29', '#215a6d', '#3ca2a2', '#92c7a3', '#dfece6', '#cfffdd', '#b4dec1', '#5c5863', '#a85163', '#ff1f4c', '#4e395d', '#827085', '#8ebe94', '#ccfc8e', '#dc5b3e', '#9dc9ac', '#fffec7', '#f56218', '#ff9d2e', '#919167', '#a1dbb2', '#fee5ad', '#faca66', '#f7a541', '#f45d4c', '#ffefd3', '#fffee4', '#d0ecea', '#9fd6d2', '#8b7a5e', '#a8a7a7', '#cc527a', '#e8175d', '#474747', '#363636', '#ffedbf', '#f7803c', '#f54828', '#2e0d23', '#f8e4c1', '#f8edd1', '#d88a8a', '#474843', '#9d9d93', '#c5cfc6', '#f38a8a', '#55443d', '#a0cab5', '#cde9ca', '#f1edd0', '#4e4d4a', '#353432', '#94ba65', '#2790b0', '#2b4e72', '#0ca5b0', '#4e3f30', '#fefeeb', '#f8f4e4', '#a5b3aa', '#a70267', '#f10c49', '#fb6b41', '#f6d86b', '#339194', '#9d7e79', '#ccac95', '#9a947c', '#748b83', '#5b756c', '#edf6ee', '#d1c089', '#b3204d', '#412e28', '#151101', '#046d8b', '#309292', '#2fb8ac', '#93a42a', '#ecbe13', '#4d3b3b', '#de6262', '#ffb88c', '#ffd0b3', '#f5e0d3', '#fffbb7', '#a6f6af', '#66b6ab', '#5b7c8d', '#4f2958', '#ff003c', '#ff8a00', '#fabe28', '#88c100', '#00c176', '#fcfef5', '#e9ffe1', '#cdcfb7', '#d6e6c3', '#fafbe3', '#9cddc8', '#bfd8ad', '#ddd9ab', '#f7af63', '#633d2e', '#30261c', '#403831', '#36544f', '#1f5f61', '#0b8185', '#d1313d', '#e5625c', '#f9bf76', '#8eb2c5', '#615375', '#ffe181', '#eee9e5', '#fad3b2', '#ffba7f', '#ff9c97', '#aaff00', '#ffaa00', '#ff00aa', '#aa00ff', '#00aaff', '#c2412d', '#d1aa34', '#a7a844', '#a46583', '#5a1e4a'];
    return colors.slice(0, qtd);
  }



  public getStringData(value: string): string {
    if (value === null || value === undefined || value.trim() === '') { return ''; }

    return value.trim();
  }

  public setBooleanValue(value: string): boolean {
    if (value === null || value === undefined || value.trim() === '') { return false; }
    return value.trim() === '1';
  }

  public getBinaryValue(value: boolean): string {
    return value ? '1' : '0';
  }

  public jsonIsEqual(obj1: any, obj2: any): boolean {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) { return false; }

    for (const key in obj1) {
      if (obj1[key] !== obj2[key]) { return false; }
    }

    return true;
  }
}
