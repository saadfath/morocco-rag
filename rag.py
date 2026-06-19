"""
RAG core: loads procedures.json, builds a TF-IDF index, retrieves top-k chunks.
No GPU / heavy ML deps needed — pure Python + scikit-learn.
"""
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class ProcedureRAG:
    def __init__(self, json_path="procedures.json"):
        with open(json_path, encoding="utf-8") as f:
            self.procedures = json.load(f)
        self.chunks = [p["chunk"] for p in self.procedures]
        self.vectorizer = TfidfVectorizer(
            analyzer="word",
            ngram_range=(1, 2),
            min_df=1,
            sublinear_tf=True,
        )
        self.matrix = self.vectorizer.fit_transform(self.chunks)

    def retrieve(self, query: str, top_k: int = 4) -> list[dict]:
        q_vec = self.vectorizer.transform([query])
        scores = cosine_similarity(q_vec, self.matrix).flatten()
        top_idx = np.argsort(scores)[::-1][:top_k]
        results = []
        for i in top_idx:
            if scores[i] > 0:
                results.append({"score": float(scores[i]), **self.procedures[i]})
        return results
