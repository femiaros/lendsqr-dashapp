import React from 'react'

const UserInfoBody = ({user}) => {
  return (
    <div className='userinfo__body'>
        <div className="userinfo__body__container">
            <div id='box1' 
                className="userinfo__body__detail-box general open"
            >
                <div className="general-field personal">
                    <h4 className='general-field__title'>Personal Information</h4>

                    <div className="general-field__content">
                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">Full name</span>
                            <span className="general-field__content__item__value">{`${user.profile.firstName} ${user.profile.lastName}`}</span>
                        </div>

                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">marital status</span>
                            <span className="general-field__content__item__value">not stated</span>
                        </div>
                    </div>

                    <div className="general-field__content">
                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">phone number</span>
                            <span className="general-field__content__item__value"><>{user.phoneNumber.split('x')[0]}</></span>
                        </div>

                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">children</span>
                            <span className="general-field__content__item__value">none</span>
                        </div>
                    </div>

                    <div className="general-field__content">
                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">email address</span>
                            <span className="general-field__content__item__value email">{user.email}</span>
                        </div>

                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">type of residence</span>
                            <span className="general-field__content__item__value">parent's apartment</span>
                        </div>
                    </div>

                    <div className="general-field__content">
                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">bvn</span>
                            <span className="general-field__content__item__value">{user.profile.bvn}</span>
                        </div>
                    </div>

                    <div className="general-field__content">
                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">gender</span>
                            <span className="general-field__content__item__value">{user.profile.gender}</span>
                        </div>
                    </div>

                </div>

                <div className="general-field education">
                    <h4 className='general-field__title'>Education and Employment</h4>

                    <div className="general-field__content">
                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">level of education</span>
                            <span className="general-field__content__item__value">{user.education.level}</span>
                        </div>

                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">office email</span>
                            <span className="general-field__content__item__value email">{user.education.officeEmail}</span>
                        </div>
                    </div>

                    <div className="general-field__content">
                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">employment status</span>
                            <span className="general-field__content__item__value">{user.education.employmentStatus}</span>
                        </div>

                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">monthly income</span>
                            <span className="general-field__content__item__value">{`N${user.education.monthlyIncome[0]}-N${user.education.monthlyIncome[1]}`}</span>
                        </div>
                    </div>

                    <div className="general-field__content">
                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">sector of employment</span>
                            <span className="general-field__content__item__value">{user.education.sector}</span>
                        </div>

                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">loan repayment</span>
                            <span className="general-field__content__item__value">{`N${user.education.loanRepayment}`}</span>
                        </div>
                    </div>

                    <div className="general-field__content">
                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">duration of employment</span>
                            <span className="general-field__content__item__value">{user.education.duration}</span>
                        </div>
                    </div>

                </div>

                <div className="general-field socials">
                    <h4 className='general-field__title'>Socials</h4>

                    <div className="general-field__content">
                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">twitter</span>
                            <span className="general-field__content__item__value">{user.socials.twitter}</span>
                        </div>
                    </div>

                    <div className="general-field__content">
                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">facebook</span>
                            <span className="general-field__content__item__value">{user.socials.facebook}</span>
                        </div>
                    </div>

                    <div className="general-field__content">
                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">instagram</span>
                            <span className="general-field__content__item__value">{user.socials.instagram}</span>
                        </div>
                    </div>

                </div>

                <div className="general-field guarantor">
                    <h4 className='general-field__title'>Guarantor</h4>

                    <div className="general-field__content">
                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">full name</span>
                            <span className="general-field__content__item__value">{`${user.guarantor.firstName} ${user.guarantor.lastName}`}</span>
                        </div>
                    </div>

                    <div className="general-field__content">
                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">phone number</span>
                            <span className="general-field__content__item__value">{user.guarantor.phoneNumber.split('x')[0]}</span>
                        </div>
                    </div>

                    <div className="general-field__content">
                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">email address</span>
                            <span className="general-field__content__item__value email">{`${user.guarantor.firstName}@gmail.com`}</span>
                        </div>
                    </div>

                    <div className="general-field__content">
                        <div className="general-field__content__item">
                            <span className="general-field__content__item__title">relationship</span>
                            <span className="general-field__content__item__value">
                                {
                                    user.guarantor.gender === 'Male' ? 'brother':'sister'
                                }
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            <div id='box2' className="userinfo__body__detail-box">
                
                <div className="general-field document">
                    <h4 className='general-field__title'>Document Information</h4>
                </div>
                
            </div>

            <div id='box3' className="userinfo__body__detail-box">

                <div className="general-field bank">
                    <h4 className='general-field__title'>Bank Details</h4>
                </div>

            </div>

            <div id='box4' className="userinfo__body__detail-box">
              
                <div className="general-field loans">
                    <h4 className='general-field__title'>Loans</h4>
                </div>

            </div>
            
            <div id='box5' className="userinfo__body__detail-box">
               
                <div className="general-field savings">
                    <h4 className='general-field__title'>Savings</h4>
                </div>

            </div>

            <div id='box6' className="userinfo__body__detail-box">
            
                <div className="general-field app">
                    <h4 className='general-field__title'>App and System</h4>
                </div>

            </div>
        </div>
    </div>
  )
}

export default UserInfoBody