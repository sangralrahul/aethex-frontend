import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Image, Loader2, Bot, Sparkles } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m aethex AI, your medical assistant. Ask me about NEET PG prep, medical queries, drug info, or I can generate medical images for you.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [mode, setMode] = useState('chat');
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    try {
      if (mode === 'image') {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Generating image...', loading: true }]);
        const res = await axios.post(`${API}/chat/image`, { prompt: userMsg }, { timeout: 120000 });
        setMessages(prev => prev.filter(m => !m.loading).concat([{ role: 'assistant', content: '', image: `data:image/png;base64,${res.data.image_base64}` }]));
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: '', loading: true }]);
        const res = await axios.post(`${API}/chat`, { message: userMsg, session_id: sessionId });
        if (!sessionId) setSessionId(res.data.session_id);
        setMessages(prev => prev.filter(m => !m.loading).concat([{ role: 'assistant', content: res.data.response }]));
      }
    } catch {
      setMessages(prev => prev.filter(m => !m.loading).concat([{ role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]));
    } finally { setLoading(false); }
  };

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} className="fixed bottom-24 right-5 z-[9998] w-14 h-14 rounded-full bg-[#9F67FF] text-white shadow-[0_0_25px_rgba(159,103,255,0.5)] hover:bg-[#B28AFF] transition-all hover:scale-105 flex items-center justify-center" data-testid="chatbot-toggle">
          <MessageSquare size={22} />
        </button>
      )}

      {open && (
        <div className="fixed bottom-24 right-5 z-[9998] w-[380px] max-w-[calc(100vw-40px)] h-[560px] max-h-[calc(100vh-140px)] bg-[#0B0F1A] border border-[#2A2540] rounded-2xl shadow-[0_0_40px_rgba(159,103,255,0.15)] flex flex-col overflow-hidden" data-testid="chatbot-panel">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#141025] border-b border-[#2A2540]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#9F67FF]/20 flex items-center justify-center">
                <Sparkles size={16} className="text-[#B28AFF]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white" style={{ fontFamily: 'Cabinet Grotesk' }}>aethex AI</p>
                <p className="text-[10px] text-slate-500">Powered by GPT-5.2</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/5 rounded text-slate-400" data-testid="chatbot-close"><X size={18} /></button>
          </div>

          {/* Mode toggle */}
          <div className="flex border-b border-[#2A2540]">
            <button onClick={() => setMode('chat')} className={`flex-1 py-2 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${mode === 'chat' ? 'text-[#B28AFF] border-b-2 border-[#9F67FF] bg-[#9F67FF]/5' : 'text-slate-500 hover:bg-white/5'}`} data-testid="mode-chat">
              <Bot size={14} /> Chat
            </button>
            <button onClick={() => setMode('image')} className={`flex-1 py-2 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${mode === 'image' ? 'text-[#B28AFF] border-b-2 border-[#9F67FF] bg-[#9F67FF]/5' : 'text-slate-500 hover:bg-white/5'}`} data-testid="mode-image">
              <Image size={14} /> Generate Image
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" data-testid="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-[#9F67FF] text-white rounded-2xl rounded-br-md' : 'bg-[#141025] border border-[#2A2540] text-slate-200 rounded-2xl rounded-bl-md'} px-3.5 py-2.5`}>
                  {msg.loading ? (
                    <div className="flex items-center gap-2 text-sm text-slate-400"><Loader2 size={14} className="animate-spin" /> {msg.content || 'Thinking...'}</div>
                  ) : msg.image ? (
                    <img src={msg.image} alt="Generated" className="rounded-lg max-w-full" />
                  ) : (
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[#2A2540]">
            <div className="flex items-center gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder={mode === 'image' ? 'Describe the image...' : 'Ask anything...'} className="flex-1 h-10 px-3 rounded-lg border border-[#2A2540] text-sm text-white bg-[#141025] focus:outline-none focus:ring-1 focus:ring-[#9F67FF] placeholder:text-slate-600" disabled={loading} data-testid="chat-input" />
              <button onClick={sendMessage} disabled={loading || !input.trim()} className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#9F67FF] text-white hover:bg-[#B28AFF] transition-colors flex-shrink-0 disabled:opacity-40" data-testid="chat-send">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
