export default class TcpConnection {
  private conn: Deno.TcpConn | null = null;
  private buffer: Uint8Array = new Uint8Array(4096);

  constructor() {}

  get isConnected() {
    return this.conn !== null;
  }

  async connect(hostname = "127.0.0.1", port = 5672) {
    if (this.isConnected) {
      return;
    }
    this.conn = await Deno.connect({
      hostname,
      port,
      transport: "tcp",
    });
  }

  async write(data: Uint8Array) {
    if (!this.isConnected) {
      throw new Error("Not connected");
    }
    await this.conn!.write(data);
  }

  async onRead(callback: (data: Uint8Array) => Promise<void>) {
    while (true) {
      if (!this.isConnected) {
        return;
      }
      const n = (await this.conn!.read(this.buffer)) as number;
      if (n !== null) {
        try {
          callback(this.buffer.slice(0, n));
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  close() {
    if (this.conn) {
      this.conn.close();
    }
    this.conn = null;
  }
}
