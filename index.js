// init game assets

const grids = document.querySelectorAll(".grid");
const player = document.querySelector("#player");
const goal = document.querySelector("#goal");
const max = 2;
const min = 0;
let gridNumber = 0;

const movePlayer = (gridIndex) => {
	if (gridIndex < min || gridIndex > max) {
		gridNumber = gridIndex < min ? 0 : 2;
		return;
	}
	console.log(gridIndex);

	const playerNode = document.querySelector("#player");
	playerNode.parentNode.removeChild(playerNode);

	const gridNode = document.querySelector(`#g-${gridIndex}`);
	gridNode.appendChild(playerNode);
};

const commandInterpreter = (text) => {
	switch (text.toLowerCase()) {
		case "move right":
			movePlayer(++gridNumber);
			break;
		case "move left":
			movePlayer(--gridNumber);
			break;
		default:
			break;
	}
};

function pocMessageHandler(message){
  // do stuff with message
  console.log(`I received [${message}] from iFrame parent`)
}

/* 
	Code below binds the button click event to get input from the textbox, the app will function fine without the code below. 
*/
document.querySelector("#commandBtn").addEventListener("click", () => {
	const command = document.querySelector("#commandText").value;
	commandInterpreter(command);
});

// bind speech recognition button
let isRecording = false
const micBtn = document.querySelector("#micBtn")
/* micBtn.addEventListener("click", () => {
	isRecording = !isRecording
	if (isRecording) {
		startRecording()
	} else {
		stopRecording()
	}
}); */


// Add Web Speech Api
var recognition = new webkitSpeechRecognition();

const startRecording = () => {
	micBtn.classList.remove('btn-success')
	micBtn.classList.add('btn-danger')
	micBtn.textContent = 'Stop Recognition'

	if (window.hasOwnProperty('webkitSpeechRecognition')) {

		recognition.continuous = false;

		recognition.interimResults = false;

		recognition.lang = 'en-US';

		recognition.start();

		recognition.onresult = function (e) {

			document.querySelector("#commandText").value = e.results[0][0].transcript;

			stopRecording()

		};

		recognition.onerror = function (e) {
			stopRecording()
		}

	}
}

const stopRecording = () => {

	micBtn.classList.add('btn-success')
	micBtn.classList.remove('btn-danger')
	micBtn.textContent = 'Start Recognition'

	recognition.stop();
}
