const shell = require("shelljs");
const date = require("date-and-time");

const final_op = {
  device_status: [],
  update_time: "",
};

const ping_schema = (ip_add, status) => {
  const ping_json = {
    host: ip_add,
    status: status,
  };
  return ping_json;
};

const ping_function = (ip_addr) => {
  var ping = shell.exec(`ping -n 1 ${ip_addr}`, {
    silent: true,
  });
  if (ping.stdout.includes("host unreachable")) {
    final_op["device_status"].push(ping_schema(ip_addr, "Offline"));
  } else if (ping.stdout.includes("timed out")) {
    final_op["device_status"].push(ping_schema(ip_addr, "Offline"));
  } else {
    final_op["device_status"].push(ping_schema(ip_addr, "Online"));
  }
};

const ping_devices = () => {
  const now = new Date();
  final_op.device_status = [];
  final_op.update_time = date.format(now, "YYYY/MM/DD HH:mm:ss");
  const devices =
    (process.env.DEVICES || "pintoinfant.tech").split(
      " "
    );
  devices.forEach((device) => {
    ping_function(device);
  });
  return final_op;
};

module.exports = ping_devices;
