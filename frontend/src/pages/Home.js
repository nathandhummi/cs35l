import { useEffect, useState } from 'react';

const Home = () => {
    const [notes, setNotes] = useState(null);
  
    useEffect(() => {
      const fetchNotes = async () => {
        const response = await fetch('http://localhost:4000/api/notes');
        const json = await response.json();
  
        if (response.ok) {
          setNotes(json);
        }
      };
  
      fetchNotes();
    }, []);
  
    return (
      <div className="home">
        <div className="notes">
          {notes && notes.map(note => (
            <p key={note._id}>{note.title}</p>
          ))}
        </div>
      </div>
    );
};

export default Home;