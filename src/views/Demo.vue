<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <div id="myApp">
        <ul class="list-group">
            <li v-for="item in receivedData" class="list-group-item">
                <a v-bind:href=genHref(item.id)>{{item.name}}</a>-{{item.age}}-{{item.birth}}
            </li>
        </ul>
    </div>

    <script>
        var myApp = new Vue({
            el: "#myApp",
            data:{
                receivedData:[] //定义一个用于接收后端传过来值的本地变量
            },
            methods:{
                //定义一个函数，用于通过ajax方法访问后端
                getInfo(){ 
                    axios.get('../data.json')
                    .then(res=>{
                        this.receivedData=res.data //将返回值赋给上述已定义的本地变量
                    })
                },
                //定义一个方法，用于动态绑定循环项中a标签的href属性值
                genHref(data)
                {
                    return("read.html?id="+data)
                }
            },
            mounted(){ //页面加载完成后执行访问后端的函数
                this.getInfo()
            }
        })
    </script>
