### input取中文值
```
        var flag = true;
        $('#txt').on('compositionstart',function(){
            flag = false;
        })
        $('#txt').on('compositionend',function(){
            flag = true;
        })
        $('#txt').on('input',function(){
            var _this = this;
            setTimeout(function(){
                if(flag){
                    console.log($(_this).val());
                }
            },0)
        })
```
