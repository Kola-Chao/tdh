//插入排序
//https://juejin.im/post/6844903609885261832
module.exports = {
    insertionSort(arr) {
        //console.time('InsertionSort');
        let len = arr.length;
        for (let i = 1; i < len; i++) {
            let j = i;
            let tmp = arr[i];
            while (j > 0 && arr[j - 1] > tmp) {
                arr[j] = arr[j - 1];
                j--;
            }
            arr[j] = tmp;
        }
        //console.timeEnd('InsertionSort');
        return arr;
    },
    
}