import nlp from "compromise";

export const extractTopics = (text) => {
    const doc = nlp(text);

    // Extract keywords that could be potential topics
    const mainTopics = doc.nouns().out("array");

    // Extract phrases that might serve as subtopics
    const subtopicCandidates = doc.match("#Adjective #Noun").out("array");

    // Organize subtopics under their main topics
    const subtopics = {};
    mainTopics.forEach(topic => {
        subtopics[topic] = subtopicCandidates.filter(phrase => phrase.toLowerCase().includes(topic.toLowerCase()));
    });

    return {
        main: mainTopics.length ? mainTopics : ["General"],
        subtopics: Object.keys(subtopics).length ? subtopics : { General: ["Miscellaneous"] }
    };
};
