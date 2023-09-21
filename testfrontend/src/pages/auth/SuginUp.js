import React , {useEffect,useState} from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {  useSelector } from 'react-redux';
import { yupResolver } from "@hookform/resolvers/yup";
import PATHS from "../../../routes/paths";
import { useForm ,Controller} from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link} from "react-router-dom";
import { useStudentSignUpMutation,useGetCourseListQuery} from "../../../Services/api";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
export default function SuginUp() {
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("first name is required"),
    last_name: Yup.string().required("last name is required"),
    nationality: Yup.string().required("country is required"),
    language: Yup.string().required("language is required"),
    gender: Yup.string().required("gender is required"),
    course_id: Yup.string().required("course name is required"),
    dob: Yup.string().required("date of birth is required"),
    address: Yup.string().required("address is required"),
    company: Yup.string().required("company is required"),
    job_position: Yup.string().required("job title is required"),
    source: Yup.string().required("source is required"),
    phoneNumber: Yup.string().required("mobile number is required"),
    term: Yup.string().required("term and condition is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),

  });
  const navigator = useNavigate();
  const {userDetail } = useSelector(
    (state) => state.auth
  )
    useEffect(()=>{
      if(userDetail){
        navigator(PATHS.studentDashboard);
      } ///
  },[userDetail,navigator])
  let defaultValues = { first_name: "", last_name: "" };
  const notify = () => '';
  const methods = useForm({
    mode: "onTouched",
    
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const [StudentSignUp] = useStudentSignUpMutation();
  
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = (values,e) => {
    StudentSignUp({ data: values })
      .unwrap()
      .then((payload) => {
       
        if (payload.status) {
          if(payload.data===0){
            toast.error(payload.message)
          }
          else{
            // e.target.reset()
            // const response = {
            //   token: payload.token,
            //   user: payload.data,
            // };
            // localStorage.setItem('authType',2);
            // dispatch(loggedIn(response));
            if(values.course_id !==100 && values.paymentamount > 0){
              
                const { first_name,last_name,course,email,phoneNumber,amount} = values;
                window.location.href = "https://www.qhseinternational.com/online_payment/ccavRequestHandler.php?first-name="+first_name+"&last-name="+last_name+"&amount="+values.paymentamount+"&your-email="+email+"&phone="+phoneNumber+"&merchant_param1="+course;
            
            }else{
              toast.success('Your are successfully registered please check your email')
              navigator('/login');
            }
          
          }
          
        } else {
          toast.error(payload.message)
        }
      })
      .catch((error) => {
        toast.error(error.data.message)
      });
      notify();
  };
  const {  
    data: getCourseList        
} = useGetCourseListQuery({  params:''});
  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12 col-md-12 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <img src="assets/img/logo.png" alt="" />
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">ELEARNING </h5>
                        <p>Course Registration</p>
                      </div>
                      <form className="row g-3 needs-validation" >
                        <div className="col-6">
                          <label htmlFor="yourUsername" className="form-label">First Name</label>
                          <div className="input-group has-validation">
                            <input type="name"  {...register("first_name")} className="form-control" id="yourUsername" />
                          </div>
                          <span className="text-danger">{errors.first_name?.message}</span>
                        </div>
                        <div className="col-6">
                          <label htmlFor="yourUsername" className="form-label">Last Name</label>
                          <div className="input-group has-validation">
                            <input type="name"  {...register("last_name")} className="form-control" id="yourUsername" />
                          </div>
                          <span className="text-danger">{errors.last_name?.message}</span>
                        </div>
                        <div className="col-6">
                          <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
                          <div className="input-group has-validation">
                          <Controller
                              name="phoneNumber"
                              className="form-control"
                              control={control}
                              rules={{ required: 'Phone number is required' }}
                              render={({ field }) => (
                                <PhoneInput
                                  {...field}
                                  country={'pk'} // Replace with the desired default country
                                  placeholder="Enter phone number"
                                />
                              )}
                            />
                          </div>
                          <span className="text-danger">{errors.phoneNumber?.message}</span>
                        </div>
                        <div className="col-6">
                          <label htmlFor="yourUsername" className="form-label">Nationality</label>
                          <div className="input-group has-validation">
                                <select id="nationality" {...register("nationality")} className="form-control">
                                        <option value="">Select Country</option>
                                        <option value="Afghanistan">Afghanistan</option>
                                        <option value="Åland Islands">Åland Islands</option>
                                        <option value="Albania">Albania</option>
                                        <option value="Algeria">Algeria</option>
                                        <option value="American Samoa">American Samoa</option>
                                        <option value="Andorra">Andorra</option>
                                        <option value="Angola">Angola</option>
                                        <option value="Anguilla">Anguilla</option>
                                        <option value="Antarctica">Antarctica</option>
                                        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                        <option value="Argentina">Argentina</option>
                                        <option value="Armenia">Armenia</option>
                                        <option value="Aruba">Aruba</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Austria">Austria</option>
                                        <option value="Azerbaijan">Azerbaijan</option>
                                        <option value="Bahamas">Bahamas</option>
                                        <option value="Bahrain">Bahrain</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Barbados">Barbados</option>
                                        <option value="Belarus">Belarus</option>
                                        <option value="Belgium">Belgium</option>
                                        <option value="Belize">Belize</option>
                                        <option value="Benin">Benin</option>
                                        <option value="Bermuda">Bermuda</option>
                                        <option value="Bhutan">Bhutan</option>
                                        <option value="Bolivia">Bolivia</option>
                                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                        <option value="Botswana">Botswana</option>
                                        <option value="Bouvet Island">Bouvet Island</option>
                                        <option value="Brazil">Brazil</option>
                                        <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                        <option value="Brunei Darussalam">Brunei Darussalam</option>
                                        <option value="Bulgaria">Bulgaria</option>
                                        <option value="Burkina Faso">Burkina Faso</option>
                                        <option value="Burundi">Burundi</option>
                                        <option value="Cambodia">Cambodia</option>
                                        <option value="Cameroon">Cameroon</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Cape Verde">Cape Verde</option>
                                        <option value="Cayman Islands">Cayman Islands</option>
                                        <option value="Central African Republic">Central African Republic</option>
                                        <option value="Chad">Chad</option>
                                        <option value="Chile">Chile</option>
                                        <option value="China">China</option>
                                        <option value="Christmas Island">Christmas Island</option>
                                        <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                        <option value="Colombia">Colombia</option>
                                        <option value="Comoros">Comoros</option>
                                        <option value="Congo">Congo</option>
                                        <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                                        <option value="Cook Islands">Cook Islands</option>
                                        <option value="Costa Rica">Costa Rica</option>
                                        <option value="Cote D'ivoire">Cote D'ivoire</option>
                                        <option value="Croatia">Croatia</option>
                                        <option value="Cuba">Cuba</option>
                                        <option value="Cyprus">Cyprus</option>
                                        <option value="Czech Republic">Czech Republic</option>
                                        <option value="Denmark">Denmark</option>
                                        <option value="Djibouti">Djibouti</option>
                                        <option value="Dominica">Dominica</option>
                                        <option value="Dominican Republic">Dominican Republic</option>
                                        <option value="Ecuador">Ecuador</option>
                                        <option value="Egypt">Egypt</option>
                                        <option value="El Salvador">El Salvador</option>
                                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                                        <option value="Eritrea">Eritrea</option>
                                        <option value="Estonia">Estonia</option>
                                        <option value="Ethiopia">Ethiopia</option>
                                        <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                        <option value="Faroe Islands">Faroe Islands</option>
                                        <option value="Fiji">Fiji</option>
                                        <option value="Finland">Finland</option>
                                        <option value="France">France</option>
                                        <option value="French Guiana">French Guiana</option>
                                        <option value="French Polynesia">French Polynesia</option>
                                        <option value="French Southern Territories">French Southern Territories</option>
                                        <option value="Gabon">Gabon</option>
                                        <option value="Gambia">Gambia</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Germany">Germany</option>
                                        <option value="Ghana">Ghana</option>
                                        <option value="Gibraltar">Gibraltar</option>
                                        <option value="Greece">Greece</option>
                                        <option value="Greenland">Greenland</option>
                                        <option value="Grenada">Grenada</option>
                                        <option value="Guadeloupe">Guadeloupe</option>
                                        <option value="Guam">Guam</option>
                                        <option value="Guatemala">Guatemala</option>
                                        <option value="Guernsey">Guernsey</option>
                                        <option value="Guinea">Guinea</option>
                                        <option value="Guinea-bissau">Guinea-bissau</option>
                                        <option value="Guyana">Guyana</option>
                                        <option value="Haiti">Haiti</option>
                                        <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                        <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                        <option value="Honduras">Honduras</option>
                                        <option value="Hong Kong">Hong Kong</option>
                                        <option value="Hungary">Hungary</option>
                                        <option value="Iceland">Iceland</option>
                                        <option value="India">India</option>
                                        <option value="Indonesia">Indonesia</option>
                                        <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                        <option value="Iraq">Iraq</option>
                                        <option value="Ireland">Ireland</option>
                                        <option value="Isle of Man">Isle of Man</option>
                                        <option value="Israel">Israel</option>
                                        <option value="Italy">Italy</option>
                                        <option value="Jamaica">Jamaica</option>
                                        <option value="Japan">Japan</option>
                                        <option value="Jersey">Jersey</option>
                                        <option value="Jordan">Jordan</option>
                                        <option value="Kazakhstan">Kazakhstan</option>
                                        <option value="Kenya">Kenya</option>
                                        <option value="Kiribati">Kiribati</option>
                                        <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                        <option value="Korea, Republic of">Korea, Republic of</option>
                                        <option value="Kuwait">Kuwait</option>
                                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                                        <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                        <option value="Latvia">Latvia</option>
                                        <option value="Lebanon">Lebanon</option>
                                        <option value="Lesotho">Lesotho</option>
                                        <option value="Liberia">Liberia</option>
                                        <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                        <option value="Liechtenstein">Liechtenstein</option>
                                        <option value="Lithuania">Lithuania</option>
                                        <option value="Luxembourg">Luxembourg</option>
                                        <option value="Macao">Macao</option>
                                        <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                                        <option value="Madagascar">Madagascar</option>
                                        <option value="Malawi">Malawi</option>
                                        <option value="Malaysia">Malaysia</option>
                                        <option value="Maldives">Maldives</option>
                                        <option value="Mali">Mali</option>
                                        <option value="Malta">Malta</option>
                                        <option value="Marshall Islands">Marshall Islands</option>
                                        <option value="Martinique">Martinique</option>
                                        <option value="Mauritania">Mauritania</option>
                                        <option value="Mauritius">Mauritius</option>
                                        <option value="Mayotte">Mayotte</option>
                                        <option value="Mexico">Mexico</option>
                                        <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                        <option value="Moldova, Republic of">Moldova, Republic of</option>
                                        <option value="Monaco">Monaco</option>
                                        <option value="Mongolia">Mongolia</option>
                                        <option value="Montenegro">Montenegro</option>
                                        <option value="Montserrat">Montserrat</option>
                                        <option value="Morocco">Morocco</option>
                                        <option value="Mozambique">Mozambique</option>
                                        <option value="Myanmar">Myanmar</option>
                                        <option value="Namibia">Namibia</option>
                                        <option value="Nauru">Nauru</option>
                                        <option value="Nepal">Nepal</option>
                                        <option value="Netherlands">Netherlands</option>
                                        <option value="Netherlands Antilles">Netherlands Antilles</option>
                                        <option value="New Caledonia">New Caledonia</option>
                                        <option value="New Zealand">New Zealand</option>
                                        <option value="Nicaragua">Nicaragua</option>
                                        <option value="Niger">Niger</option>
                                        <option value="Nigeria">Nigeria</option>
                                        <option value="Niue">Niue</option>
                                        <option value="Norfolk Island">Norfolk Island</option>
                                        <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                        <option value="Norway">Norway</option>
                                        <option value="Oman">Oman</option>
                                        <option value="Pakistan">Pakistan</option>
                                        <option value="Palau">Palau</option>
                                        <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                        <option value="Panama">Panama</option>
                                        <option value="Papua New Guinea">Papua New Guinea</option>
                                        <option value="Paraguay">Paraguay</option>
                                        <option value="Peru">Peru</option>
                                        <option value="Philippines">Philippines</option>
                                        <option value="Pitcairn">Pitcairn</option>
                                        <option value="Poland">Poland</option>
                                        <option value="Portugal">Portugal</option>
                                        <option value="Puerto Rico">Puerto Rico</option>
                                        <option value="Qatar">Qatar</option>
                                        <option value="Reunion">Reunion</option>
                                        <option value="Romania">Romania</option>
                                        <option value="Russian Federation">Russian Federation</option>
                                        <option value="Rwanda">Rwanda</option>
                                        <option value="Saint Helena">Saint Helena</option>
                                        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                        <option value="Saint Lucia">Saint Lucia</option>
                                        <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                        <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                                        <option value="Samoa">Samoa</option>
                                        <option value="San Marino">San Marino</option>
                                        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                        <option value="Saudi Arabia">Saudi Arabia</option>
                                        <option value="Senegal">Senegal</option>
                                        <option value="Serbia">Serbia</option>
                                        <option value="Seychelles">Seychelles</option>
                                        <option value="Sierra Leone">Sierra Leone</option>
                                        <option value="Singapore">Singapore</option>
                                        <option value="Slovakia">Slovakia</option>
                                        <option value="Slovenia">Slovenia</option>
                                        <option value="Solomon Islands">Solomon Islands</option>
                                        <option value="Somalia">Somalia</option>
                                        <option value="South Africa">South Africa</option>
                                        <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                                        <option value="Spain">Spain</option>
                                        <option value="Sri Lanka">Sri Lanka</option>
                                        <option value="Sudan">Sudan</option>
                                        <option value="Suriname">Suriname</option>
                                        <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                        <option value="Swaziland">Swaziland</option>
                                        <option value="Sweden">Sweden</option>
                                        <option value="Switzerland">Switzerland</option>
                                        <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                        <option value="Taiwan">Taiwan</option>
                                        <option value="Tajikistan">Tajikistan</option>
                                        <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                        <option value="Thailand">Thailand</option>
                                        <option value="Timor-leste">Timor-leste</option>
                                        <option value="Togo">Togo</option>
                                        <option value="Tokelau">Tokelau</option>
                                        <option value="Tonga">Tonga</option>
                                        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                        <option value="Tunisia">Tunisia</option>
                                        <option value="Turkey">Turkey</option>
                                        <option value="Turkmenistan">Turkmenistan</option>
                                        <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                        <option value="Tuvalu">Tuvalu</option>
                                        <option value="Uganda">Uganda</option>
                                        <option value="Ukraine">Ukraine</option>
                                        <option value="United Arab Emirates">United Arab Emirates</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="United States">United States</option>
                                        <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                        <option value="Uruguay">Uruguay</option>
                                        <option value="Uzbekistan">Uzbekistan</option>
                                        <option value="Vanuatu">Vanuatu</option>
                                        <option value="Venezuela">Venezuela</option>
                                        <option value="Viet Nam">Viet Nam</option>
                                        <option value="Virgin Islands, British">Virgin Islands, British</option>
                                        <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                        <option value="Wallis and Futuna">Wallis and Futuna</option>
                                        <option value="Western Sahara">Western Sahara</option>
                                        <option value="Yemen">Yemen</option>
                                        <option value="Zambia">Zambia</option>
                                        <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                          </div>
                          <span className="text-danger">{errors.nationality?.message}</span>
                        </div>
                        <div className="col-6">
                          <label htmlFor="language" className="form-label">Language</label>
                          <div className="input-group has-validation">
                            <input type="name"  {...register("language")} className="form-control" id="yourUsername" />
                          </div>
                          <span className="text-danger">{errors.language?.message}</span>
                        </div>
                       
                        <div className="col-6">
                          <label htmlFor="gender" className="form-label">Gender</label>
                           <div className="input-group has-validation">
                                <select id="gender" {...register("gender")} className="form-control">
                                    <option value="">Select option</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                          </div>
                          <span className="text-danger">{errors.gender?.message}</span>

                        </div>
                        <div className="col-6">
                          <label htmlFor="yourUsername" className="form-label"> Course</label>
                          <div className="input-group has-validation">
                                <select  {...register("course_id", { required: true })} className="form-control">
                                    <option value="">Select Course</option>
                                    <option value="100"> Free Course</option>                                           
                                    {                            
                                    getCourseList?.data?.map((item) => {
                                        return (
                                            <option key={item.course_id} value={item.course_id}>{item.course_name}</option>                                           
                                            )
                                        })
                                    }
                                    </select>                          </div>
                                <span className="text-danger">{errors.course_id?.message}</span>
                                <a href="https://www.qhseinternational.com/nebosh-courses/" target="_blank" className="text-danger">Read More</a>
                        </div>
                        
                        <div className="col-6">
                            <label htmlFor="dateofirth" className="form-label">Date Of Birth</label>
                            <div className="input-group has-validation">
                                <input type="date" {...register("dob")} className="form-control" id="dob" />
                            </div>
                            <span className="text-danger">{errors.dob?.message}</span>
                        </div>
                        <div className="col-6">
                          <label htmlFor="address" className="form-label"> Address</label>
                          <div className="input-group has-validation">
                            <input type="address"  {...register("address")} className="form-control" id="yourUsername" />
                          </div>
                          <span className="text-danger">{errors.address?.message}</span>
                        </div>
                        <div className="col-6">
                          <label htmlFor="company" className="form-label">Company</label>
                          <div className="input-group has-validation">
                            <input type="company"  {...register("company")} className="form-control" id="company" />
                          </div>
                          <span className="text-danger">{errors.company?.message}</span>
                        </div>
                        <div className="col-6">
                          <label htmlFor="job_position" className="form-label">Job Position</label>
                          <div className="input-group has-validation">
                            <input type="job_position"  {...register("job_position")} className="form-control" id="job" />
                          </div>
                          <span className="text-danger">{errors.job_position?.message}</span>
                        </div>
                        <div className="col-6">
                          <label htmlFor="email" className="form-label">Email Address</label>
                          <div className="input-group has-validation">
                            <input type="email"  {...register("email")} className="form-control" id="email" />
                          </div>
                          <span className="text-danger">{errors.email?.message}</span>
                        </div>
                        <div className="col-6">
                          <label htmlFor="source" className="form-label">How did you hear about QHSE International?</label>
                          <div className="input-group has-validation">
                            <input type="source"  {...register("source")} className="form-control" id="source" />
                          </div>
                          <span className="text-danger">{errors.source?.message}</span>
                        </div>
                        <div className="col-6">
                          <label htmlFor="source" className="form-label">Amount (Optional)</label>
                          <div className="input-group has-validation">
                            <input type="number"  {...register("paymentamount")} className="form-control" id="source" />
                          </div>
                        </div>
                        
                        <div className="col-12">
                          <div className="input-group has-validation">
                            <input type="checkbox"  {...register("term")}  />
                            <label htmlFor="term" className="form-label"> &nbsp; I read, understand, and agree to the <a className="text-warning" href="https://www.qhseinternational.com/terms-and-conditions/">terms and conditions </a>set forth by QHSE International</label>
                          </div>
                          <span className="text-danger">{errors.term?.message}</span>
                        </div>
                        
                        <div className="col-12">
                          <button type="submit" className="btn btn-warning w-100" onClick={handleSubmit(onSubmit)}>Register Now</button>
                          <p className="text-center">OR</p>
                          <p className="text-center"><Link to="/login" className="text-success">Login ? </Link></p>
                        </div>
                        <div className="col-12">
                        </div>
                      </form>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}