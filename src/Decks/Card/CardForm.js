import React from "react";

function CardForm({ front, back, setFront, setBack, handleSave, handleCancel }) {
  return (
    <form onSubmit={handleSave}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          className="form-control"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          className="form-control"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          required
        />
      </div>
      <button type="button" className="btn btn-secondary mr-2" onClick={handleCancel}>
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

export default CardForm;
