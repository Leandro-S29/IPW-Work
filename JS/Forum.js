var threads = [
     {
          id: 1,
          title: "Bem Vindos!",
          author: "João Cardoso",
          date: Date.now(),
          content: "Bem vindos ao nosso forum!",
          comments: [
               {
                    author: "João Cardoso",
                    date: Date.now(),
                    content: "Olá a todos!"
               }
          ]
     },
     {
          id: 2,
          title: "Post teste",
          author: "João Cardoso",
          date: Date.now(),
          content: "teste",
          comments: [
               {
                    author: "teste",
                    date: Date.now(),
                    content: "teste"
               }
          ]
     }
]

var threads;
if(localStorage && localStorage.getItem('threads')) {
     threads = JSON.parse(localStorage.getItem('threads'));
} else {
     threads = deafultThreads;
     localStorage.setItem('threads'. JSON.stringify(deafultThreads));
}