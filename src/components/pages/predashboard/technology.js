import React, { Component } from 'react';
import { itemsFetchData } from '../../../actions/fuelSavingsActions';

var count1 =0;
var count2=0;
const data = {
   "technology" : "string",
   "framework" : "string",
   "type" : "string"
 }
class Technology extends Component {
   constructor(props)
   {
      super(props)
      this.state={
            toggleFramework:false,
            technology:[
               {name:'java' , status: false},
               {name:'Javascript' , status: false},
               {name:'Objecttice ' , status: false},
               {name:'Ruby' , status: false},
               {name:'C' , status: false},
               {name:'.NET' , status: false},
               {name:'Golang' , status: false},
               {name:'Swift' , status: false},
               {name:'Python' , status: false},
               {name:'PHP' , status: false},
               {name:'Perl' , status: false},
               {name:'C++' , status: false},
               // {name:'Other' , status: false},
            ],
            framework:[
               {name:'Angular.Js' , status: false},
               {name:'Ruby On Rails' , status: false},
               {name:'Laravel' , status: false},
               {name:'Symphony' , status: false},
               {name:'ASP.NET' , status: false},
               {name:'Other' , status: false},
               {name:'Others' , status: false},
               {name:"Don't Know, Don't Care" , status: false},
            ],
            projectType:[
               {name:"Mobile Website" , status:false},
               {name:"Online Website" , status:false},
               {name:"Computer Program" , status:false},
            ],
            techCount :0,
            frameCount :0,
            proCount :0,
            x1:[],
            x2:[],
            x3:'',
            tech:'',
            fram:'',
            types:'',
         
      }
   }
   componentDidMount()
	{
      
      fetch('https://virtserver.swaggerhub.com/GROW-Labs/GROWLabs_API/1.0.0/api_calibration/technology')
      .then(res=> res.json())
      .then(data=>console.log('resTechData',data))
      console.log(data,"techData")
		if(this.props.technologyData.framework != null){
         this.setState({proCount:1,frameCount:1,techCount:1})
         this.setState({framework:this.props.technologyData.framework,
             technology:this.props.technologyData.technology},()=>{console.log('x11',this.state.framework)})
         
		console.log(this.props.technologyData,'technologyData')}
	}
   activeTechnology =(name)=>
   { 
     this.setState({
     
        technology: this.state.technology.filter((item)=>{
        
         if(item.name == name)
         {  this.setState({techCount: 1,tech:item.name})
         if(item['status'] == true){item['status']= false}
         else if(item['status'] == false){item['status']= true}
            return item
         }
         return item
      })
   
   })
   }
   activeFramework =(name)=>
   {
     this.setState({
     
        framework: this.state.framework.filter((item)=>{
         if(item.name == name)
         {  
            this.setState({frameCount: 1,fram:item.name})
            if(item['status'] == true){item['status']= false}
            else if(item['status'] == false){item['status']= true}
            return item
         }
         return item
      })
   })
   }
   activeProjectType =(name)=>
   {
      this.setState({
     
        projectType: this.state.projectType.filter((item)=>{
         item['status']= false;
         if(item.name == name)
         {  
            this.setState({proCount: 1,types:item.name})
            item['status']= true
            return item
         }
         return item
      })
   
   })
   }
  
   handleAccepted =()=>{
      
      var values ={
         technology: this.state.tech,
         framework:this.state.fram,
         type:this.state.types
      }
      var values2 ={
         technology: this.state.technology,
         framework:this.state.framework,
         type:this.state.x3
      }
      console.log('values23',values)
     
         fetch('https://virtserver.swaggerhub.com/GROW-Labs/GROWLabs_API/1.0.0/api_calibration/technology',{
            method:'POST',
            body: JSON.stringify(values)
          }).then(res=>console.log('postData',res))   
            setTimeout(() => {
              this.props.changeValue(2,values2)
            }, 1000);

      
      
    }
    componentDidUpdate()
    {
       console.log(this.state,'xyz')
       console.log(this.props,'xyz2')
    }
    render(){
     
     const Technology = this.state.technology.map(item=>
         {
            return <div className={item.status ? "technology_box active": "technology_box"} onClick={()=>this.activeTechnology(item.name)}>
            <p>{item.name}</p>
            </div>
         })

      const Framework = this.state.framework.map(item=>
         {
            return <div className={item.status ? "technology_box active": "technology_box"} onClick={()=>this.activeFramework(item.name)}>
            <p>{item.name}</p>
            </div>
         })

      const ProjectType = this.state.projectType.map(item=>
         {
            return <div className={item.status ? "technology_box active": "technology_box"} onClick={()=>this.activeProjectType(item.name)}>
            <p>{item.name}</p>
            </div>
         })
      return (
        <section className={this.state.technology != '' && this.state.framework != '' && this.state.x3 != '' ? "technology animations-disable" : "technology animations-check"} >
               <div className="technology_top">
                  
                  <p>Define the terms on Which You will Collaborate</p>
               </div>
               <div className="technology_back">
               <div className="technology_center">
                  <h1>Technology</h1>
                 {Technology}
               </div>
               <div className="technology_center">
                <h4>FRAMEWORK</h4>
                 {Framework}
               </div>
               <div className="technology_center">
                <h4>PROJECT TYPE</h4>
                 {ProjectType}
               </div>
               </div>
               {this.state.proCount == 1 && this.state.frameCount == 1 && this.state.techCount == 1 ?
             
               <a target="_blank" className="button" onClick={this.handleAccepted}>Accept [Section]<br /><span> Accept setup as the grounds on which to finalize parthnership</span></a>
            :   
            <a target="_blank"  className="button"style={{background: 'rgb(212, 217, 221)'}}>Accept [Section]<br /><span> Accept setup as the grounds on which to finalize parthnership</span></a>
            }
             </section>
      );  
    };  
  };
  
  export default Technology;
  