import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase';
import '../1_Assets/main.css';
import HerogramLogo from '../1_Assets/HerogramLogo.webp';

const Registration = () =>{
    const navigate = useNavigate();
    
    function HandleSubmit() {
        const docId = "NAkbomUuiHLMXgFzshiv";
        const Users = firebase.firestore().collection("Users");
        const CurrentUsers = firebase.firestore().collection("CurrentUsers");
    
        const Email = document.getElementById("email").value;
        const Number = document.getElementById("no").value;
        const Name = document.getElementById("Name").value;
        const CountryCodeSelect = document.getElementById("countryCode");
        const Password = document.getElementById("password").value;
    
        if (Name === '') {
            document.getElementById('error').innerHTML = "PLEASE ENTER YOUR NAME";
            return;
        }
    
        var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/;
    
        if (Email === "" || !Email.match(validRegex)) {
            document.getElementById('error').innerHTML = "PLEASE ENTER A VALID EMAIL";
            return;
        }
    
        // Get the selected country code value
        const CountryCode = CountryCodeSelect.options[CountryCodeSelect.selectedIndex].value;
    
        if (Number === "") {
            console.log('Hello');
            document.getElementById('error').innerHTML = "PLEASE ENTER A VALID PHONE NUMBER";
            return;
        }

        if (Password === "") {
            console.log('Hello');
            document.getElementById('error').innerHTML = "PLEASE CHOOSE A PASSWORD";
            return;
        }
    
    
        const dataToUpdate = {
            Name: Name,
            Email: Email,
            CountryCode: CountryCode,
            Number: Number,
            Password: Password,
            time: firebase.firestore.FieldValue.serverTimestamp(),
        };
    
        CurrentUsers.doc(docId)
            .set(dataToUpdate, { merge: true })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    
        Users.add({
            Name: Name,
            Email: Email,
            CountryCode: CountryCode,
            Number: Number,
            Password: Password,
            time: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(doc =>{
            // navigate('/SuccessPlayer1');
            navigate("/Dashboard", {state:{id:doc.id}})
        });
    }
    
    
    return( 
            
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height: '100vh',background: 'black'}}>

            <div style={{display: 'flex', flexDirection: 'column', width: '100%', gap:'5px', alignItems: 'center', justifyContent:'center'}}>
                <img alt='HerogramLogo' style={{width: '140px'}} src={HerogramLogo}/>
                
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100vh', marginBottom:'15px'}}>
                    <h1 className='specialFont' style={{paddingRight: '50px', paddingLeft: '50px', color: 'white', fontSize: '25px'}}>REGISTRATION</h1>
                </div>
                
                <div style={{ width: "100%", maxWidth: '700px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <input className='specialFont' type="text" placeholder='NAME' id="Name" style={{opacity: '0.6', background:"white", border:"1px solid transparent", textAlign: 'center', marginBottom:'15px', width:"70%", height:'30px', color:"black", paddingLeft: '10px', paddingRight: '10px', backgroundColor: 'white', borderRadius: '120px', fontSize: '16px'}}/> 
                </div>

                <div style={{ width: "100%", maxWidth: '700px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <input className='specialFont' type="email" placeholder='EMAIL' id='email' style={{opacity: '0.6', background:"white", border:"1px solid transparent", textAlign: 'center', marginBottom:'15px', width:"70%", height:'30px', color:"black", paddingLeft: '10px', paddingRight: '10px', backgroundColor: 'white' , borderRadius: '120px', fontSize: '16px'}} />
                </div>

                <div style={{width:"73%", maxWidth: '520px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '30px',  marginBottom:'15px', }}>
                    <select id="countryCode" required style = {{ width: '40%',  opacity: '0.6', background:"white", border:"1px solid transparent", textAlign: 'center', height:'34px', color:"black", paddingLeft: '10px', paddingRight: '10px', backgroundColor: 'white', borderRadius: '120px 0px 0px 120px', fontSize: '16px'}}>
                        <option selected value="(+971) UAE">(+971)</option>
                        <option value="+213 Algeria">+213 Algeria</option>
                        <option value="+376 Andorra">+376 Andorra</option>
                        <option value="+244 Angola">+244 Angola</option>
                        <option value="+1264 Anguilla">+1264 Anguilla</option>
                        <option value="+1268 Antigua & Barbuda">+1268 Antigua & Barbuda</option>
                        <option value="+54 Argentina">+54 Argentina</option>
                        <option value="+374 Armenia">+374 Armenia</option>
                        <option value="+297 Aruba">+297 Aruba</option>
                        <option value="+61 Australia">+61 Australia</option>
                        <option value="+43 Austria">+43 Austria</option>
                        <option value="+994 Azerbaijan">+994 Azerbaijan</option>
                        <option value="+1242 Bahamas">+1242 Bahamas</option>
                        <option value="+973 Bahrain">+973 Bahrain</option>
                        <option value="+880 Bangladesh">+880 Bangladesh</option>
                        <option value="+1246 Barbados">+1246 Barbados</option>
                        <option value="+375 Belarus">+375 Belarus</option>
                        <option value="+32 Belgium">+32 Belgium</option>
                        <option value="+501 Belize">+501 Belize</option>
                        <option value="+229 Benin">+229 Benin</option>
                        <option value="+1441 Bermuda">+1441 Bermuda</option>
                        <option value="+975 Bhutan">+975 Bhutan</option>
                        <option value="+591 Bolivia">+591 Bolivia</option>
                        <option value="+387 Bosnia Herzegovina">+387 Bosnia Herzegovina</option>
                        <option value="+267 Botswana">+267 Botswana</option>
                        <option value="+55 Brazil">+55 Brazil</option>
                        <option value="+673 Brunei">+673 Brunei</option>
                        <option value="+359 Bulgaria">+359 Bulgaria</option>
                        <option value="+226 Burkina Faso">+226 Burkina Faso</option>
                        <option value="+257 Burundi">+257 Burundi</option>
                        <option value="+855 Cambodia">+855 Cambodia</option>
                        <option value="+237 Cameroon">+237 Cameroon</option>
                        <option value="+1 Canada">+1 Canada</option>
                        <option value="+238 Cape Verde Islands">+238 Cape Verde Islands</option>
                        <option value="+1345 Cayman Islands">+1345 Cayman Islands</option>
                        <option value="+236 Central African Republic">+236 Central African Republic</option>
                        <option value="+56 Chile">+56 Chile</option>
                        <option value="+86 China">+86 China</option>
                        <option value="+57 Colombia">+57 Colombia</option>
                        <option value="+269 Comoros">+269 Comoros</option>
                        <option value="+242 Congo">+242 Congo</option>
                        <option value="+682 Cook Islands">+682 Cook Islands</option>
                        <option value="+506 Costa Rica">+506 Costa Rica</option>
                        <option value="+385 Croatia">+385 Croatia</option>
                        <option value="+53 Cuba">+53 Cuba</option>
                        <option value="+90392 Cyprus North">+90392 Cyprus North</option>
                        <option value="+357 Cyprus South">+357 Cyprus South</option>
                        <option value="+42 Czech Republic">+42 Czech Republic</option>
                        <option value="+45 Denmark">+45 Denmark</option>
                        <option value="+253 Djibouti">+253 Djibouti</option>
                        <option value="+1809 Dominica">+1809 Dominica</option>
                        <option value="+1809 Dominican Republic">+1809 Dominican Republic</option>
                        <option value="+593 Ecuador">+593 Ecuador</option>
                        <option value="+20 Egypt">+20 Egypt</option>
                        <option value="+503 El Salvador">+503 El Salvador</option>
                        <option value="+240 Equatorial Guinea">+240 Equatorial Guinea</option>
                        <option value="+291 Eritrea">+291 Eritrea</option>
                        <option value="+372 Estonia">+372 Estonia</option>
                        <option value="+251 Ethiopia">+251 Ethiopia</option>
                        <option value="+500 Falkland Islands">+500 Falkland Islands</option>
                        <option value="+298 Faroe Islands">+298 Faroe Islands</option>
                        <option value="+679 Fiji">+679 Fiji</option>
                        <option value="+358 Finland">+358 Finland</option>
                        <option value="+33 France">+33 France</option>
                        <option value="+594 French Guiana">+594 French Guiana</option>
                        <option value="+689 French Polynesia">+689 French Polynesia</option>
                        <option value="+241 Gabon">+241 Gabon</option>
                        <option value="+220 Gambia">+220 Gambia</option>
                        <option value="+7880 Georgia">+7880 Georgia</option>
                        <option value="+49 Germany">+49 Germany</option>
                        <option value="+233 Ghana">+233 Ghana</option>
                        <option value="+350 Gibraltar">+350 Gibraltar</option>
                        <option value="+30 Greece">+30 Greece</option>
                        <option value="+299 Greenland">+299 Greenland</option>
                        <option value="+1473 Grenada">+1473 Grenada</option>
                        <option value="+590 Guadeloupe">+590 Guadeloupe</option>
                        <option value="+671 Guam">+671 Guam</option>
                        <option value="+502 Guatemala">+502 Guatemala</option>
                        <option value="+224 Guinea">+224 Guinea</option>
                        <option value="+245 Guinea - Bissau">+245 Guinea - Bissau</option>
                        <option value="+592 Guyana">+592 Guyana</option>
                        <option value="+509 Haiti">+509 Haiti</option>
                        <option value="+504 Honduras">+504 Honduras</option>
                        <option value="+852 Hong Kong">+852 Hong Kong</option>
                        <option value="+36 Hungary">+36 Hungary</option>
                        <option value="+354 Iceland">+354 Iceland</option>
                        <option value="+91 India">+91 India</option>
                        <option value="+62 Indonesia">+62 Indonesia</option>
                        <option value="+98 Iran">+98 Iran</option>
                        <option value="+964 Iraq">+964 Iraq</option>
                        <option value="+353 Ireland">+353 Ireland</option>
                        <option value="+972 Israel">+972 Israel</option>
                        <option value="+39 Italy">+39 Italy</option>
                        <option value="+1876 Jamaica">+1876 Jamaica</option>
                        <option value="+81 Japan">+81 Japan</option>
                        <option value="+962 Jordan">+962 Jordan</option>
                        <option value="+7 Kazakhstan">+7 Kazakhstan</option>
                        <option value="+254 Kenya">+254 Kenya</option>
                        <option value="+686 Kiribati">+686 Kiribati</option>
                        <option value="+850 Korea North">+850 Korea North</option>
                        <option value="+82 Korea South">+82 Korea South</option>
                        <option value="+965 Kuwait">+965 Kuwait</option>
                        <option value="+996 Kyrgyzstan">+996 Kyrgyzstan</option>
                        <option value="+856 Laos">+856 Laos</option>
                        <option value="+371 Latvia">+371 Latvia</option>
                        <option value="+961 Lebanon">+961 Lebanon</option>
                        <option value="+266 Lesotho">+266 Lesotho</option>
                        <option value="+231 Liberia">+231 Liberia</option>
                        <option value="+218 Libya">+218 Libya</option>
                        <option value="+417 Liechtenstein">+417 Liechtenstein</option>
                        <option value="+370 Lithuania">+370 Lithuania</option>
                        <option value="+352 Luxembourg">+352 Luxembourg</option>
                        <option value="+853 Macao">+853 Macao</option>
                        <option value="+389 Macedonia">+389 Macedonia</option>
                        <option value="+261 Madagascar">+261 Madagascar</option>
                        <option value="+265 Malawi">+265 Malawi</option>
                        <option value="+60 Malaysia">+60 Malaysia</option>
                        <option value="+960 Maldives">+960 Maldives</option>
                        <option value="+223 Mali">+223 Mali</option>
                        <option value="+356 Malta">+356 Malta</option>
                        <option value="+692 Marshall Islands">+692 Marshall Islands</option>
                        <option value="+596 Martinique">+596 Martinique</option>
                        <option value="+222 Mauritania">+222 Mauritania</option>
                        <option value="+269 Mayotte">+269 Mayotte</option>
                        <option value="+52 Mexico">+52 Mexico</option>
                        <option value="+691 Micronesia">+691 Micronesia</option>
                        <option value="+373 Moldova">+373 Moldova</option>
                        <option value="+377 Monaco">+377 Monaco</option>
                        <option value="+976 Mongolia">+976 Mongolia</option>
                        <option value="+1664 Montserrat">+1664 Montserrat</option>
                        <option value="+212 Morocco">+212 Morocco</option>
                        <option value="+258 Mozambique">+258 Mozambique</option>
                        <option value="+95 Myanmar">+95 Myanmar</option>
                        <option value="+264 Namibia">+264 Namibia</option>
                        <option value="+674 Nauru">+674 Nauru</option>
                        <option value="+977 Nepal">+977 Nepal</option>
                        <option value="+31 Netherlands">+31 Netherlands</option>
                        <option value="+687 New Caledonia">+687 New Caledonia</option>
                        <option value="+64 New Zealand">+64 New Zealand</option>
                        <option value="+505 Nicaragua">+505 Nicaragua</option>
                        <option value="+227 Niger">+227 Niger</option>
                        <option value="+234 Nigeria">+234 Nigeria</option>
                        <option value="+683 Niue">+683 Niue</option>
                        <option value="+672 Norfolk Islands">+672 Norfolk Islands</option>
                        <option value="+670 Northern Marianas">+670 Northern Marianas</option>
                        <option value="+47 Norway">+47 Norway</option>
                        <option value="+968 Oman">+968 Oman</option>
                        <option value="+680 Palau">+680 Palau</option>
                        <option value="+92 Pakistan">+92 Pakistan</option>
                        <option value="+507 Panama">+507 Panama</option>
                        <option value="+675 Papua New Guinea">+675 Papua New Guinea</option>
                        <option value="+595 Paraguay">+595 Paraguay</option>
                        <option value="+51 Peru">+51 Peru</option>
                        <option value="+63 Philippines">+63 Philippines</option>
                        <option value="+48 Poland">+48 Poland</option>
                        <option value="+351 Portugal">+351 Portugal</option>
                        <option value="+1787 Puerto Rico">+1787 Puerto Rico</option>
                        <option value="+974 Qatar">+974 Qatar</option>
                        <option value="+262 Reunion">+262 Reunion</option>
                        <option value="+40 Romania">+40 Romania</option>
                        <option value="+7 Russia">+7 Russia</option>
                        <option value="+250 Rwanda">+250 Rwanda</option>
                        <option value="+378 San Marino">+378 San Marino</option>
                        <option value="+239 Sao Tome & Principe">+239 Sao Tome & Principe</option>
                        <option value="+966 Saudi Arabia">+966 Saudi Arabia</option>
                        <option value="+221 Senegal">+221 Senegal</option>
                        <option value="+381 Serbia">+381 Serbia</option>
                        <option value="+248 Seychelles">+248 Seychelles</option>
                        <option value="+232 Sierra Leone">+232 Sierra Leone</option>
                        <option value="+65 Singapore">+65 Singapore</option>
                        <option value="+421 Slovak Republic">+421 Slovak Republic</option>
                        <option value="+386 Slovenia">+386 Slovenia</option>
                        <option value="+677 Solomon Islands">+677 Solomon Islands</option>
                        <option value="+252 Somalia">+252 Somalia</option>
                        <option value="+27 South Africa">+27 South Africa</option>
                        <option value="+34 Spain">+34 Spain</option>
                        <option value="+94 Sri Lanka">+94 Sri Lanka</option>
                        <option value="+290 St. Helena">+290 St. Helena</option>
                        <option value="+1869 St. Kitts">+1869 St. Kitts</option>
                        <option value="+1758 St. Lucia">+1758 St. Lucia</option>
                        <option value="+249 Sudan">+249 Sudan</option>
                        <option value="+597 Suriname">+597 Suriname</option>
                        <option value="+268 Swaziland">+268 Swaziland</option>
                        <option value="+46 Sweden">+46 Sweden</option>
                        <option value="+41 Switzerland">+41 Switzerland</option>
                        <option value="+963 Syria">+963 Syria</option>
                        <option value="+886 Taiwan">+886 Taiwan</option>
                        <option value="+7 Tajikstan">+7 Tajikstan</option>
                        <option value="+66 Thailand">+66 Thailand</option>
                        <option value="+228 Togo">+228 Togo</option>
                        <option value="+676 Tonga">+676 Tonga</option>
                        <option value="+1868 Trinidad & Tobago">+1868 Trinidad & Tobago</option>
                        <option value="+216 Tunisia">+216 Tunisia</option>
                        <option value="+90 Turkey">+90 Turkey</option>
                        <option value="+993 Turkmenistan">+993 Turkmenistan</option>
                        <option value="+1649 Turks & Caicos Islands">+1649 Turks & Caicos Islands</option>
                        <option value="+688 Tuvalu">+688 Tuvalu</option>
                        <option value="+256 Uganda">+256 Uganda</option>
                        <option value="+44 UK">+44 UK</option>
                        <option value="+380 Ukraine">+380 Ukraine</option>
                        <option value="+971 United Arab Emirates">+971 United Arab Emirates</option>
                        <option value="+598 Uruguay">+598 Uruguay</option>
                        <option value="+1 USA">+1 USA</option>
                        <option value="+7 Uzbekistan">+7 Uzbekistan</option>
                        <option value="+678 Vanuatu">+678 Vanuatu</option>
                        <option value="+379 Vatican City">+379 Vatican City</option>
                        <option value="+58 Venezuela">+58 Venezuela</option>
                        <option value="+84 Vietnam">+84 Vietnam</option>
                        <option value="+1284 Virgin Islands - British">+1284 Virgin Islands - British</option>
                        <option value="+1340 Virgin Islands - US">+1340 Virgin Islands - US</option>
                        <option value="+681 Wallis & Futuna">+681 Wallis & Futuna</option>
                        <option value="+969 Yemen (North)">+969 Yemen (North)</option>
                        <option value="+967 Yemen (South)">+967 Yemen (South)</option>
                        <option value="+260 Zambia">+260 Zambia</option>
                        <option value="+263 Zimbabwe">+263 Zimbabwe</option>

                    </select>
                    <input className='specialFont' type="number" placeholder='MOBILE PHONE' id='no' style={{ opacity: '0.6', background:"white", border:"1px solid transparent", textAlign: 'center', width:"70%", height:'30px', color:"black", paddingLeft: '10px', paddingRight: '10px', backgroundColor: 'white', borderRadius: '0px 120px 120px 0px', fontSize: '16px' }} />
                </div>

                <div style={{width:"100%",maxWidth: '700px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <input className='specialFont' type="password" placeholder='PASSWORD' id='password' style={{opacity: '0.6', background:"white", border:"1px solid transparent", textAlign: 'center', marginBottom:'15px', width:"70%", height:'30px', color:"black", paddingLeft: '10px', paddingRight: '10px', backgroundColor: 'white' , borderRadius: '120px', fontSize: '16px'}} />
                </div>

                <div style={{height: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginBottom: '5px'}}>
                    <p id='error' style={{color:"red", fontSize: '10px'}}></p>
                </div>

                <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: '10px'}}>
                    {/* <NavLink to="/Player2Registration" style={{textDecoration: 'none'}}> */}
                        <button onClick={HandleSubmit} className='specialFont' id="buttontext" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', cursor: 'grab', height: '40px', padding: '10px', width: '250px', backgroundColor: 'white', borderRadius: '120px', fontSize: '16px', color: '#1E1450', border: '1px solid transparent'}}>REGISTER</button>
                    {/* </NavLink> */}
                </div>

            </div>
            
        </div>
    )
}

export default Registration;