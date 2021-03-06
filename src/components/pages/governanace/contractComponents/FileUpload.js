import React , {Component} from 'react';
import Dropzone from 'react-dropzone';
// import files from '../../../../assets/img/dragCloud.png';

var arr = [];

const CLOUDINARY_UPLOAD_PRESET = '1';
const CLOUDINARY_UPLOAD_URL = './assets/img';

class FileUpload extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            arrayList:[],
            uploadedFileCloudinaryUrl: ''
        }
    }
    formatBytes = (bytes,decimals)=> {
      if(bytes == 0) return '0 Bytes';
      var k = 1024,
          dm = decimals <= 0 ? 0 : decimals || 2,
          sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }
    
    fileUploader = (acceptedFiles, rejected) =>
    {
        console.log(acceptedFiles,'acceptedFiles')
        for(var i = 0 ;i< acceptedFiles.length ;i++)
        { var fileSize = this.formatBytes(acceptedFiles[i].size);
          var dataList ={
            id: i,
            acceptedFile : acceptedFiles[i].name,
            size: fileSize,
            
          }
          this.setState({arrayList:[]})
          this.setState({arrayList: [...this.state.arrayList, dataList]})
          console.log('filePath ',this.state.arrayList)
        }
        if(this.props.getInput1=='PS'){this.props.getInput(this.state.arrayList)}
        if(this.props.getInput1 == 'banner' || this.props.getInput1 == 'modal'){this.props.getInput(this.state.arrayList)}
        if(this.props.getInput1 == 'video'){this.props.getInput(this.state.arrayList)}
        if(this.props.name && this.props.getInput ==''){
        this.props.getInput1(this.state.arrayList,this.props.name);}
        if(this.props.getInput1 =='')
        {this.props.getInput(this.state.arrayList);}
        if(rejected && rejected.length > 0)
        {
            console.log('rejected ',rejected)
        }
        

      }    
    
    render()
    {
        
        const listItems = this.state.arrayList.map((number) =>
          <li>{number}</li>
        );
        return(
<div>
{/* <h1>file Upload</h1> */}
<Dropzone onDrop={this.fileUploader}>
  {({getRootProps, getInputProps}) => (
    <section className="drad-drop">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {this.props.getInput1=='PS' ? <img src='./assets/img/pancel_b.png' style={{width: '50%'}} />
        : this.props.getInput1 !='modal' && <img src='./assets/img/dragCloud.png' style={{width: '30%'}} />}
        {this.props.getInput1=='modal'?  <img src='./assets/img/drad-drop.png'  /> :''}
        {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
      </div>
    </section>
  )}
</Dropzone>
{/* <ul>{listItems}</ul> */}
</div>
        );
    }
}

export default FileUpload;