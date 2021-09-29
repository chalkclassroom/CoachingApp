export default function getFaqSection({
    questions,
    user,
}: {
    questions: Array<{ text: Array<{ id: string }> }>
    user: UserDocument
}) {
    return [
        {
            name: 'FAQ',
            title: 'FAQ',
            text: questions
                .flatMap(({ text }) => text)
                .filter(question =>
                    user.favouriteQuestions.includes(question.id)
                ),
        },
    ]
}
