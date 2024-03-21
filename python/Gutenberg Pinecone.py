from langchain.document_loaders import GutenbergLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.llms import OpenAI
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain import PromptTemplate
from langchain.chains import LLMChain
from dotenv import load_dotenv
import os
import pinecone

load_dotenv()

embeddings = OpenAIEmbeddings()


# initialize pinecone
pinecone.init(
    api_key="24e8dca8-0f67-4740-b0d9-45f67815deef", 
    environment="gcp-starter", 
)

index_name = "gutenberg"

# # First, check if our index already exists. If it doesn't, we create it
if index_name not in pinecone.list_indexes():
#     # we create a new index
    pinecone.create_index(name=index_name, metric="cosine", dimension=1536)
# # The OpenAI embedding model `text-embedding-ada-002 uses 1536 dimensions`
# docsearch = Pinecone.from_documents(docs, embeddings, index_name=index_name, namespace='christmascarol')


objects = [
    {"url": "https://www.gutenberg.org/cache/epub/2701/pg2701.txt", "namespace": "mobydick1"},
    {"url": "https://gutenberg.org/cache/epub/1513/pg1513.txt", "namespace": "romeoandjuliet"},
    {"url": "https://gutenberg.org/cache/epub/55/pg55.txt", "namespace": "wizardofoz"},
    {"url": "https://gutenberg.org/cache/epub/1342/pg1342.txt", "namespace": "prideandprejudice"},
    {"url": "https://gutenberg.org/cache/epub/84/pg84.txt", "namespace": "frankenstein"},
    {"url": "https://gutenberg.org/cache/epub/2641/pg2641.txt", "namespace": "roomwithaview"},
    {"url": "https://gutenberg.org/cache/epub/145/pg145.txt", "namespace": "middlemarch"},
    {"url": "https://gutenberg.org/cache/epub/37106/pg37106.txt", "namespace": "littlewomen"},
    {"url": "https://gutenberg.org/cache/epub/16389/pg16389.txt", "namespace": "theenchantedapril"},
]

# Loop over the objects
for obj in objects:
    loader = GutenbergLoader(obj["url"])
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    docs = text_splitter.split_documents(documents)

    docsearch = Pinecone.from_documents(docs, embeddings, index_name=index_name, namespace=obj["namespace"])
