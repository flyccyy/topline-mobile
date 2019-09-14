//对token操作的封装

//定义一个常量保存Key
const Author_Key = 'user'

//设置
function setAuthor(val){
    window.localStorage.setItem(Author_Key,JSON.stringify(val))
}

//获取
function getAuthor(){
    window.localStorage.getItem(Author_Key)
}

//清除
function removeAuthor(){
    window.localStorage.removeItem(Author_Key)
}
export {
    setAuthor,
    getAuthor,
    removeAuthor
}