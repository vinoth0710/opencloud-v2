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
  // console.log(ping.stdout);
  if (ping.stdout.includes("Request timed out")) {
    final_op["device_status"].push(ping_schema(ip_addr, "Unavailable"));
  } else if (ping.stdout.includes("Destination host unreachable")) {
    final_op["device_status"].push(ping_schema(ip_addr, "Offline"));
  } else if (ping.stdout.includes("100% packet loss")) {
    final_op["device_status"].push(ping_schema(ip_addr, "Offline"));
  } else if (ping.stdout.includes("could not find host")) {
    final_op["device_status"].push(ping_schema(ip_addr, "Unavailable"));
  } else {
    final_op["device_status"].push(ping_schema(ip_addr, "Online"));
  }
};

const ping_devices = () => {
  const now = new Date();
  final_op.device_status = [];
  final_op.update_time = date.format(now, "YYYY/MM/DD HH:mm:ss");
  const devices = (
    process.env.DEVICES ||
    "pintoinfant.tech 192.168.1.101 10.8.0.1 rpidb.node.opencloud.world server.pintoinfant.tech"
  ).split(" ");
  devices.forEach((device) => {
    ping_function(device);
  });
  return final_op;
};

module.exports = ping_devices();
