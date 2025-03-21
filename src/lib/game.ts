import { shuffle } from "@/lib/utils";

type QuestionData = {
    data: {
        id: number;
        documentId: string;
        Texte: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }[],
    meta: {
        pagination: {
            page: number;
            pageCount: number;
            pageSize: number;
            total: number;
        }
    }
};

export const fetchParticipants = () => {
    try {
        // try to get participants from session storage
        const storedParticipants = sessionStorage.getItem("currentParticipants");
        if (!storedParticipants) throw new Error("No participants found.");

        const participantsData: string[] = JSON.parse(storedParticipants);
        // shuffle participants
        return shuffle(participantsData);
    } catch (error) {
        console.error("Error fetching participants:", error);
        // setLoading(false);
        return [];
    }
};


export const fetchQuestions = async () => {
    try {
        // Fetch questions
        const response = await fetch("https://icebreaker-strapi.opteam-dev.fr/api/questions");
        // const response = await fetch("http://icebreaker-admin.opteam-dev.fr/wp-json/wp/v2/questions");
        const questionsData: QuestionData = await response.json();

        if (!Array.isArray(questionsData.data)) throw new Error("Invalid question format.");

        // Extract and decode the rendered title text
        // const formattedQuestions = questionsData.map(item =>
        //     decodeEntities(item.title?.rendered || "Question inconnue")
        // );
        // console.log(formattedQuestions);

        const formattedQuestions: string[] = [];
        questionsData.data.forEach(item => {
            formattedQuestions.push(item.Texte);
        });

        // Shuffle questions
        return shuffle(formattedQuestions); // Adjust key if needed
    } catch (error) {
        console.error("Error fetching questions:", error);
        // setLoading(false);
        return [];
    }
};


