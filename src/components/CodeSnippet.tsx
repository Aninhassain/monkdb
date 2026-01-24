import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Copy } from "lucide-react";

const codeExamples = {
  javascript: `// Connect to NexusDB
import { NexusDB } from '@nexusdb/client';

const db = new NexusDB({
  host: 'your-cluster.nexusdb.io',
  apiKey: process.env.NEXUS_API_KEY
});

// Vector search with AI embeddings
const results = await db.vectors.search({
  collection: 'products',
  query: 'wireless headphones with noise cancellation',
  topK: 10,
  filter: { category: 'electronics' }
});

console.log(results);`,
  python: `# Connect to NexusDB
from nexusdb import NexusDB

db = NexusDB(
    host="your-cluster.nexusdb.io",
    api_key=os.environ["NEXUS_API_KEY"]
)

# Vector search with AI embeddings
results = db.vectors.search(
    collection="products",
    query="wireless headphones with noise cancellation",
    top_k=10,
    filter={"category": "electronics"}
)

print(results)`,
  sql: `-- Create a hybrid table with vector support
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  embedding VECTOR(1536),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Perform vector similarity search
SELECT name, description,
       cosine_similarity(embedding, $query_vector) AS score
FROM products
WHERE category = 'electronics'
ORDER BY score DESC
LIMIT 10;`,
};

type Language = keyof typeof codeExamples;

export const CodeSnippet = () => {
  const [activeTab, setActiveTab] = useState<Language>("javascript");
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { key: Language; label: string }[] = [
    { key: "javascript", label: "JavaScript" },
    { key: "python", label: "Python" },
    { key: "sql", label: "SQL" },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-6">
              <span className="text-sm text-primary font-medium">Developer Experience</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Simple, Powerful <span className="gradient-text">APIs</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Get started in minutes with our intuitive SDKs. NexusDB works seamlessly 
              with your favorite languages and frameworks, offering consistent APIs 
              across all data types.
            </p>

            <ul className="space-y-4">
              {[
                "Native SDKs for JavaScript, Python, Go, and more",
                "RESTful API with comprehensive documentation",
                "GraphQL support for flexible queries",
                "Real-time subscriptions and webhooks",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right - Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl overflow-hidden border border-border">
              {/* Tab Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
                <div className="flex gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.key
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Code Content */}
              <div className="p-6 overflow-x-auto">
                <pre className="text-sm leading-relaxed">
                  <code className="text-muted-foreground">
                    {codeExamples[activeTab].split('\n').map((line, i) => (
                      <div key={i} className="flex">
                        <span className="w-8 text-muted-foreground/40 select-none text-right pr-4">
                          {i + 1}
                        </span>
                        <span className={getLineColor(line)}>
                          {line}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Simple syntax highlighting helper
function getLineColor(line: string): string {
  if (line.startsWith('//') || line.startsWith('#') || line.startsWith('--')) {
    return 'text-muted-foreground/60';
  }
  if (line.includes('import') || line.includes('from') || line.includes('CREATE') || line.includes('SELECT')) {
    return 'text-purple-400';
  }
  if (line.includes('const') || line.includes('await') || line.includes('async')) {
    return 'text-cyan-400';
  }
  return 'text-foreground/80';
}
