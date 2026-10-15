import React from "react";
import { getInitialData } from "../utils";
import NoteInput from "./NoteInput";
import NoteSearch from "./NoteSearch";
import NotesList from "./NotesList";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),

      searchKeyword: "",
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => ({
      notes: [
        ...prevState.notes,
        {
          id: +new Date(),
          title,
          body,
          createdAt: new Date().toISOString(),
          archived: false,
        },
      ],
    }));
  }

  onDeleteHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => note.id !== id),
    }));
  }

  onArchiveHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) =>
        note.id === id
          ? {
              ...note,
              archived: !note.archived,
            }
          : note,
      ),
    }));
  }

  onSearchHandler(keyword) {
    this.setState({
      searchKeyword: keyword,
    });
  }

  render() {
    const { notes, searchKeyword } = this.state;

    const filteredNotes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        note.body.toLowerCase().includes(searchKeyword.toLowerCase()),
    );

    const sortByNewest = (a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt);

    const activeNotes = filteredNotes
      .filter((note) => !note.archived)
      .sort(sortByNewest);

    const archivedNotes = filteredNotes
      .filter((note) => note.archived)
      .sort(sortByNewest);

    return (
      <div className="note-app" data-testid="note-app">
        <div className="note-app__header" data-testid="note-app-header">
          <h1>Notes</h1>

          <NoteSearch keyword={searchKeyword} onSearch={this.onSearchHandler} />
        </div>

        <div className="note-app__body" data-testid="note-app-body">
          <NoteInput addNote={this.onAddNoteHandler} />
          <section
            aria-labelledby="active-notes-title"
            data-testid="active-notes-section"
          >
            <h2 id="active-notes-title">
              Catatan Aktif ({activeNotes.length})
            </h2>
            <NotesList
              notes={activeNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
              searchKeyword={searchKeyword}
              dataTestId="active-notes-list"
            />
          </section>
          <section
            aria-labelledby="archived-notes-title"
            data-testid="archived-notes-section"
          >
            <h2 id="archived-notes-title">Arsip ({archivedNotes.length})</h2>
            <NotesList
              notes={archivedNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
              searchKeyword={searchKeyword}
              dataTestId="archived-notes-list"
            />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
