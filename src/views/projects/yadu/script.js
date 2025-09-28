const scanBtn = document.getElementById('scanBtn');
const status = document.getElementById('status');
const attendanceList = document.getElementById('attendanceList');

async function scanNFC() {
  if ('NDEFReader' in window) {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      status.textContent = 'Scan an NFC tag...';

      ndef.onreading = event => {
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          if (record.recordType === "text") {
            const text = decoder.decode(record.data);
            logAttendance(text);
          }
        }
      };
    } catch (error) {
      status.textContent = `Error: ${error.message}`;
    }
  } else {
    status.textContent = 'NFC not supported on this device.';
  }
}

function logAttendance(id) {
  const li = document.createElement('li');
  li.textContent = `Attendance ID: ${id}`;
  attendanceList.appendChild(li);
  status.textContent = 'Scan successful!';
}

scanBtn.addEventListener('click', scanNFC);
