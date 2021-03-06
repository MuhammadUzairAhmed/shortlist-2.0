import React, { Component } from 'react';
import Agency from "./../governanace/agency"

class ContactIfo extends Component {
  constructor(props)
  {
    super(props)
    this.state={
      dataValues:'',
      actDiv:false
    }
  }
  componentDidMount()
  {
    if(this.props.contactData != '')
    {
      this.setState({dataValues: this.props.contactData})
    }
  }
  getValues = (values)=>
  {
    console.log('agencyValues',values)
    this.setState({dataValues:values},()=>{
      console.log('valuesAGENCY',this.state.dataValues)
    })
  }
  handleAccept = () => {
    this.setState({actDiv:true},()=>{
      fetch('https://virtserver.swaggerhub.com/GROW-Labs/GROWLabs_API/1.0.0/api_calibration/contact', {
        method: 'POST',
        body: JSON.stringify(this.state.dataValues)
      }).then(res => console.log('postData', res))
      setTimeout(() => {
        this.props.changeValue(6, this.state.dataValues)
      }, 1000);
    })

}
    render(){
      return (
        <section className={this.state.actDiv ? "ContactIfo animations-disable" : "ContactIfo animations-check" }>
              <div class="ContactIfo_top">
                <h1>Contact information</h1><p>Provide a sufficient number of people for your partner to contact</p>
              </div>
                  
              <Agency getValues={this.getValues} storedDetail={this.props.contactData != ''? this.props.contactData :''} chek='Predashboard'/>
              <div class="clearfix"></div>
           {this.state.dataValues != ''  || this.props.contactData != ''? <a target="_blank" onClick={this.handleAccept} class="button">Accept information<br/><span> Accept setup as the grounds on which to finalize parthnership</span></a>
              :  <a target="_blank" style={{background:'rgb(212, 217, 221)'}} class="button">Accept information<br/><span> Accept setup as the grounds on which to finalize parthnership</span></a>}

        </section>
      );  
    };  
  };
  
  export default ContactIfo;
  