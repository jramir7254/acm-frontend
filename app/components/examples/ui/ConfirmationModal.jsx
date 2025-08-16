export default function ConfirmationModal({ isOpen, onConfirm, onCancel }) {
    if (!isOpen) return null;
    return (
        <div className="modal">
            <p>Are you sure?</p>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}
