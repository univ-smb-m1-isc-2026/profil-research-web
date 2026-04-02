/*
    Component to render a question with its corresponding input type (text, checkbox, radio).
*/

export default function QuestionBox({ question, answers, handleChangeText, handleChangeCheckbox, handleChangeRadio }) {
   return (
     <div key={question.id} style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 6 }}>{question.title}</label>

        {
        // ---------------- TEXT INPUT ----------------
        }
        {question.format === 'text' && (
            <input
                type={question.id === 'base-3' ? 'email' : 'text'}
                value={answers[question.id] || ''}
                onChange={e => handleChangeText(question.id, e.target.value)}
                required
            />
        )}

        {
        // ---------------- CHECKBOX INPUT ----------------
        }
        {question.format === 'checkbox' && question.options?.map(opt => (
                <label key={opt} style={{ display: 'block' }}>
                    <input
                        type="checkbox"
                        checked={(answers[question.id] || []).includes(opt)}
                        onChange={() => handleChangeCheckbox(question.id, opt)}
                    />{' '}{opt}
                </label>
                )
            )
        }

        {
        // ---------------- RADIO INPUT ----------------
        }
        {question.format === 'radio' && question.options?.map(opt => (
                <label key={opt} style={{ display: 'block' }}>
                    <input
                        type="radio"
                        name={`q_${question.id}`}
                        checked={answers[question.id] === opt}
                        onChange={() => handleChangeRadio(question.id, opt)}
                        required
                    />{' '}{opt}
                </label>
            ))}
    </div>
   )
}