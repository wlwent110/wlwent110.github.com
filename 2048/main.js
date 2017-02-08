var list = new Vue ({
    el:'.container',
    data:{
        array:["","","","","","","","","","","","","","","",""]
    },
    mounted:function () {
        window.addEventListener('keydown', function (e) {
            if (e.keyCode == 37) {
                list.left();
            } else if (e.keyCode == 38) {
                list.up();
            } else if (e.keyCode == 39) {
                list.right();
            } else if (e.keyCode == 40) {
                list.down();
            } else {
                console.log("error");
            }
        });
    },
    beforeDestroy:function () {

    },
    methods:{
        setnumber:function () {
            var listRandom = [];
            for (var i = 0; i <= 15; i++) {
                listRandom.push(i);
            }
            var num1 = parseInt(16 * Math.random());
            listRandom.splice(num1, 1);
            var num2 = listRandom[parseInt(15 * Math.random())];
            Vue.set(list.array, num1 , 2);
            Vue.set(list.array, num2 , 2);
        },
        addnum:function () {
            var num = parseInt(16*Math.random());
            if (list.array.indexOf("") < 0) {
                return ;
            } else if (!list.array[num]) {
                Vue.set(list.array, num , 2);
            } else {
                list.addnum();
            }
        },

        logic:function (arr) {
            var isMove = false;
            for (var j = 0; j < 4; j++) {
                //如果除了第一个以外，第二个开始只要没有值就会把第一个移动到第二个，循环如果第三个没有值就把第二个移动到第三个
                for (var i = 0; i < 4; i++) {
                    if (!list.array[arr[j][i]] && list.array[arr[j][i-1]]&& i > 0) {
                        Vue.set(list.array, arr[j][i], list.array[arr[j][i-1]]);
                        Vue.set(list.array, arr[j][i-1], "");
                        isMove = true;
                    }
                }
                //如果除了第一个以外，第二个开始只要没有值就会把第一个移动到第二个
                for (var i =0; i < 4; i++) {
                    if (!list.array[arr[j][i]] && list.array[arr[j][i-1]]&& i > 0) {
                        Vue.set(list.array, arr[j][i], list.array[arr[j][i-1]]);
                        Vue.set(list.array, arr[j][i-1], "");
                        isMove = true;
                    }
                }
                for (var i = 3; i >= 0; i--) {
                    if (list.array[arr[j][i]] && list.array[arr[j][i]] == list.array[arr[j][i-1]]) {
                        Vue.set(list.array, arr[j][i], list.array[arr[j][i]] + list.array[arr[j][i-1]]);
                        Vue.set(list.array, arr[j][i-1], "");
                        isMove = true;
                    }
                }
                for (var i =0; i < 4; i++) {
                    if (!list.array[arr[j][i]] && list.array[arr[j][i-1]]&& i > 0) {
                        Vue.set(list.array, arr[j][i], list.array[arr[j][i-1]]);
                        Vue.set(list.array, arr[j][i-1], "");
                        isMove = true;
                    }
                }

            }
            var isGameOver = list.check();
            if (isGameOver == 'over') {
                alert('抱歉失败了噢~');
            } else if (isGameOver == 'success') {
                alert('恭喜成功啦！');
            } else if (isMove == true) {
                list.addnum();
            }
        },
        check:function () {
            if (list.array.indexOf(2048) >= 0) {
                return 'success';
            } else if (list.array.indexOf("") < 0) {
                for (var i = 0; i < 16; i++) {
                    var top = i - 4,
                        right = i + 1,
                        bottom = i + 4,
                        left = i - 1;
                    if ((top >= 0 && list.array[top] == list.array[i]) ||
                    (left >= 0 && list.array[left] == list.array[i] && i % 4 != 0) ||
                    (bottom <= 15 && list.array[bottom] == list.array[i]) ||
                    (right <= 15 && list.array[right] == list.array[i] && i % 3 != 0 )) {
                        return 'continue';
                    }
                }
                return 'over';
            }
        },
        down:function () {
            var arr = [
                [0,4,8,12],
                [1,5,9,13],
                [2,6,10,14],
                [3,7,11,15]
            ];
            list.logic(arr);
        },
        up:function () {
            var arr = [
                [12,8,4,0],
                [13,9,5,1],
                [14,10,6,2],
                [15,11,7,3]
            ];
            list.logic(arr);
        },
        right:function () {
            var arr = [
                [0,1,2,3],
                [4,5,6,7],
                [8,9,10,11],
                [12,13,14,15]
            ];
            list.logic(arr);
        },
        left:function () {
            var arr = [
                [3,2,1,0],
                [7,6,5,4],
                [11,10,9,8],
                [15,14,13,12]
            ];
            list.logic(arr);
        },
    },
    created:function () {
        console.log("初始化");
    },


})

list.setnumber();
