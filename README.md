Test Task
Write two classes radio and listener. Radio class must emit every topic every 400-1500 ms and 
send random string. By default Radio does not have topics, topic is created when some listener 
try to subscribe it. Every message that radio send should be crypt. Key for crypting is random 
string that generated when new listener is subscribing. For the old listeners a radio should send a 
new key for decrypting message. You can use ONLY default libraries for Node.js. Send a file as 
a result of work. 

В данном коде класс Radio отвечает за передачу сообщений, класс Listener - за прием и обработку сообщений. При создании объекта класса Radio создается пустой список topics (тем) и пустое множество listeners (слушателей). Метод subscribe добавляет слушателя в множество listeners, метод unsubscribe - удаляет его из этого множества. Метод broadcast отправляет сообщение message на тему topic всем слушателям, которые подписаны на эту тему. 