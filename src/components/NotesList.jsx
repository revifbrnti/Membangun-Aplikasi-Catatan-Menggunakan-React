import React from "react";
import NoteItem from "./NoteItem";

function getMonthYear(dateString) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
}

function NotesList({
  notes,
  onDelete,
  onArchive,
  searchKeyword,
  dataTestId = "notes-list",
}) {
  const hasNotes = notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan
        </p>
      </div>
    );
  }

  const groupedNotes = notes.reduce((groups, note) => {
    const key = getMonthYear(note.createdAt);

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(note);

    return groups;
  }, {});

  return (
    <div className="notes-list notes-list--grouped" data-testid={dataTestId}>
      {Object.entries(groupedNotes).map(([monthYear, group]) => (
        <section
          key={monthYear}
          className="notes-group"
          data-testid={`${monthYear}-group`}
        >
          {" "}
          <div className="notes-group__header">
            <h3 className="notes-group__title">{monthYear}</h3>

            <span
              className="notes-group__count"
              data-testid={`${monthYear}-group-count`}
            >
              {group.length} catatan
            </span>
          </div>
          <div className="notes-group__items">
            {group.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;
