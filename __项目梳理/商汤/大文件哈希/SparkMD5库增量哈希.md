# 大文件哈希
正常使用：
```js
var  hexHash  =  SparkMD5.hash ( 'Hi there' ); // 十六进制哈希值 
var rawHash = SparkMD5.hash( ' Hi there ' , true ) ; //或者原始哈希值（二进制字符串）        
```


增量使用：
```js
var  spark  =  new  SparkMD5 ( ) ; 
spark.append ( 'Hi' ); 
spark.append ( ' there ' ); 
var hexHash = spark.end( ); //十六进制哈希
// var rawHash = spark.end ( true ) ; // 或者原始哈希（二进制字符串）
```

## 
| 模式| 	接收的数据类型	| 核心用途	| 大文件场景适配性| 
| ---- |---- |---- |---- |
| SparkMD5()（默认）|	字符串（String）|	小文本、短字符串哈希|	❌ 极差（内存爆炸）| 
| SparkMD5.Blob()|	Blob/File 对象|	直接处理 Blob/File（无需 FileReader）|	✅ 可用，但灵活性略低| 
| SparkMD5.ArrayBuffer()（推荐）|	ArrayBuffer（二进制缓冲区）	大文件分片、二进制数据哈希	|✅ 最优（内存 + 性能双佳）| 



```js
document.getElementById ( ' file ' ) . addEventListener ( ' change ' , function ( ) { 
    var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice , 
    file = this.files [ 0 ] , 
    chunkSize = 2097152 , //以2MB为单位读取
    chunks = Math.ceil ( file.size / chunkSize ) , currentChunk = 0 , 
    spark = new SparkMD5.ArrayBuffer ( ) , 
    fileReader = new FileReader ( ) ;​​​​​​​​​​​​​   
           
                
    fileReader.onload = function ( e ) { console.log ( '读取块编号' , currentChunk + 1 , '共' , chunks ) ; spark.append ( e.target.result ) ; //追加数组缓冲区currentChunk ++ ;​    
             
        if  ( currentChunk  <  chunks )  { 
            loadNext ( ) ; 
        }  else  { 
            console . log ( '加载完成' ) ; 
            console . info ( '计算出的哈希值' ,  spark . end ( ) ) ;   // 计算哈希值
        } 
    } ;

    fileReader.onerror = function ( ) { console.warn ( '糟糕，出错了。' ) ; } ;    
        
    

    function  loadNext ( )  { 
        var  start  =  currentChunk  *  chunkSize , 
        end  =  ( ( start  +  chunkSize )  >  = file.size ) ? file.size : start + chunkSize ;​​​  

        fileReader.readAsArrayBuffer ( blobSlice.call ( file , start , end ) ) ; 
    }
    
    loadNext ( ) ; 
} ) ;