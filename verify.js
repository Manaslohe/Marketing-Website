
const firebaseConfig = {
    apiKey: "AIzaSyAit45v63nN_55nvYsE3CjMvYorB2Wpzec",
    authDomain: "rotable-d6b19.firebaseapp.com",
    projectId: "rotable-d6b19",
    storageBucket: "rotable-d6b19.appspot.com",
    messagingSenderId: "649082498971",
    appId: "1:649082498971:web:5706ff49c07b33fa9abb3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('sendOtpButton').addEventListener('click', sendOtp);
document.getElementById('verifyOtpButton').addEventListener('click', verifyOtp);

function sendOtp() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const appVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow sendOtp
            console.log('reCAPTCHA verified');
        }
    }, auth);

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then(confirmationResult => {
            window.confirmationResult = confirmationResult;
            document.getElementById('phoneInput').style.display = 'none';
            document.getElementById('otpInput').style.display = 'block';
        })
        .catch(error => {
            console.error('Error during signInWithPhoneNumber', error);
            alert('Failed to send OTP');
        });
}

function verifyOtp() {
    const otp = document.getElementById('otp').value;

    window.confirmationResult.confirm(otp)
        .then(result => {
            document.getElementById('message').textContent = 'Your number is verified!';
            document.getElementById('otpInput').style.display = 'none';
        })
        .catch(error => {
            console.error('Error during confirmation', error);
            alert('Invalid OTP');
        });
}
