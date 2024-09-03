
export default {
    wordMask(inputRef: any, field: any){
        inputRef[field] = inputRef[field].replace(/[^\p{L}\p{M} ]/gu, '');
    },
    userMask(inputRef: any, field: any){
        inputRef[field] = inputRef[field].replace(/\W/g, "");
    },
    cpfMask(inputRef: any, field: any){
        let value = inputRef[field].replace(/\D/g, "");
        value = value.replace(/^(\d{3})(\d)/, "$1.$2");
        value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
        value = value.replace(/\.(\d{3})(\d)/, ".$1-$2");
        inputRef[field] = value.slice(0, 14);
    },
    zipMask(inputRef: any, field: any){
        let value = inputRef[field].replace(/\D/g, "");
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        inputRef[field] = value.slice(0, 9);
    },
    houseNumberMask(inputRef: any, field: any){
        inputRef[field] = inputRef[field].replace(/\D/g, "");
    },
    cellPhoneMask(inputRef: any, field: any){
        let value = inputRef[field].replace(/\D/g, '');

        value = value.replace(/^(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');

        inputRef[field] = value.slice(0, 15);
    }
}
