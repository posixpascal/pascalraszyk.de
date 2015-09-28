require 'socket'

TELNET_PORT = Process.uid.zero? ? 23 : 1337

server = TCPServer.new TELNET_PORT
loop do
	puts "Server listening on port #{TELNET_PORT}"
	Thread.start(server.accept) do |client|
		client.puts "not yet."
		client.close()
	end
end
