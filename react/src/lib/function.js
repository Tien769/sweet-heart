


// Kiểm trả inp (string) chỉ chứa ký tự là số.
export function checkOnlyNumber(inp){
    inp = String(inp);
    let numbers = /^[0-9]+$/;
    if (inp.match(numbers) !== null) return true;
    return false;
}