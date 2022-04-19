class Encoder {
    convertToWritble(commands: (string | number)[]): Buffer {
        let encodedCmd = `*${commands.length}\r\n`;
        commands.forEach(cmd =>
            encodedCmd += `$${Buffer.byteLength(cmd.toString())}\r\n${cmd}\r\n`
        );
        return Buffer.from(encodedCmd, "utf-8");
    }
}
export default Encoder;