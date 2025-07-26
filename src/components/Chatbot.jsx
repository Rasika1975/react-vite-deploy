import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Phone, FileText, MapPin, Calendar, Languages, Volume2, Mic, MicOff, Menu, X, AlertCircle, CheckCircle, Clock, Scale } from 'lucide-react';

const DOJChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Namaste! I am AI Justice Assistant. How can I help you today? I can assist with RTI applications, legal information, case status, and more.',
      timestamp: new Date(),
      category: 'greeting'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [userType, setUserType] = useState('citizen'); // citizen, lawyer, officer
  const messagesEndRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' }
  ];

  const quickActions = {
    citizen: [
      { icon: FileText, text: 'File RTI Request', action: 'rti' },
      { icon: AlertCircle, text: 'Report Crime/FIR', action: 'fir' },
      { icon: Scale, text: 'Legal Rights Info', action: 'rights' },
      { icon: Phone, text: 'Emergency Helpline', action: 'helpline' }
    ],
    lawyer: [
      { icon: FileText, text: 'Case Management', action: 'case_mgmt' },
      { icon: Scale, text: 'Legal Updates', action: 'updates' },
      { icon: Calendar, text: 'Court Schedule', action: 'schedule' },
      { icon: FileText, text: 'Document Templates', action: 'templates' }
    ],
    officer: [
      { icon: FileText, text: 'Administrative Tasks', action: 'admin' },
      { icon: Clock, text: 'Pending Cases', action: 'pending' },
      { icon: CheckCircle, text: 'Status Updates', action: 'status' },
      { icon: MapPin, text: 'Jurisdiction Info', action: 'jurisdiction' }
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage, action = null) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Predefined responses based on common queries
    if (action === 'rti' || lowerMessage.includes('rti') || lowerMessage.includes('information')) {
      return {
        content: `To file an RTI request:
1. Visit the RTI portal or nearest PIO office
2. Fill the application form with specific information needed
3. Pay the prescribed fee (₹10 for central govt)
4. Submit with proof of identity
5. You'll receive a receipt with application number

Would you like me to help you draft an RTI application or find your nearest PIO office?`,
        category: 'rti',
        actions: ['Draft RTI', 'Find PIO Office', 'RTI Status']
      };
    }
    
    if (action === 'fir' || lowerMessage.includes('fir') || lowerMessage.includes('complaint') || lowerMessage.includes('crime')) {
      return {
        content: `To file an FIR or complaint:
1. Visit the nearest police station immediately
2. Provide detailed information about the incident
3. If police refuse, you can approach the SP/Commissioner
4. Online complaint option available on state police websites
5. Get a copy of the FIR with registration number

Emergency Helplines:
• Police: 100
• Women Helpline: 1091
• Cyber Crime: 1930

Do you need immediate assistance or want to know about specific types of complaints?`,
        category: 'emergency',
        actions: ['Emergency Contact', 'Online Complaint', 'Legal Aid']
      };
    }
    
    if (action === 'rights' || lowerMessage.includes('rights') || lowerMessage.includes('law')) {
      return {
        content: `Your fundamental rights include:
• Right to Equality (Article 14-18)
• Right to Freedom (Article 19-22)
• Right against Exploitation (Article 23-24)
• Right to Freedom of Religion (Article 25-28)
• Right to Constitutional Remedies (Article 32)

Common legal provisions:
• Domestic Violence Act, 2005
• Consumer Protection Act, 2019
• Information Technology Act, 2000

Which specific legal area would you like to know more about?`,
        category: 'legal_info',
        actions: ['Women Rights', 'Consumer Rights', 'Digital Rights']
      };
    }
    
    if (action === 'helpline' || lowerMessage.includes('help') || lowerMessage.includes('emergency')) {
      return {
        content: `Important Helpline Numbers:
🚨 Police Emergency: 100
👩 Women Helpline: 1091
🧒 Child Helpline: 1098
💻 Cyber Crime: 1930
🏥 Medical Emergency: 108
🔥 Fire Service: 101
📞 Legal Aid: 15100

For immediate emergency, please call the relevant number. 
Would you like me to connect you to legal aid services?`,
        category: 'emergency',
        actions: ['Call Now', 'Legal Aid Centers', 'Counseling Services']
      };
    }
    
    // Harassment/Violence detection
    if (lowerMessage.includes('harassment') || lowerMessage.includes('violence') || lowerMessage.includes('abuse')) {
      return {
        content: `I understand this is a serious situation. Here's immediate help:

🚨 **Immediate Action:**
• Women Helpline: 1091 (24/7)
• Domestic Violence Helpline: 181
• Police Emergency: 100

📋 **Legal Steps:**
• File complaint under Protection of Women from Domestic Violence Act
• Approach nearest Mahila Court
• Contact local Legal Aid Committee

🏥 **Support Services:**
• One Stop Crisis Centers available
• Counseling services provided

Would you like me to help you find the nearest support center or legal aid?`,
        category: 'emergency_support',
        actions: ['Find Support Center', 'Legal Procedure', 'Safety Planning']
      };
    }
    
    // Case status queries
    if (lowerMessage.includes('case status') || lowerMessage.includes('case number')) {
      return {
        content: `To check case status:
1. Visit eCourts portal (ecourts.gov.in)
2. Enter your case number or party name
3. Select the appropriate court
4. View current status and next hearing date

For FIR status:
• Visit respective state police website
• Use FIR number to track

Would you like me to guide you through the process or need help with a specific case type?`,
        category: 'case_status',
        actions: ['eCourts Portal', 'Police Case Status', 'Court Locator']
      };
    }
    
    // Default response
    return {
      content: `I can help you with:
• RTI (Right to Information) applications
• Filing complaints and FIR
• Legal rights and information
• Case status tracking
• Emergency helplines
• Court locations and procedures
• Legal aid services

Please tell me specifically what you need assistance with, or choose from the quick actions below.`,
      category: 'general',
      actions: ['RTI Help', 'File Complaint', 'Legal Rights', 'Emergency Help']
    };
  };

  const handleSendMessage = (messageText = null, action = null) => {
    const finalMessage = messageText || inputMessage.trim();
    if (!finalMessage) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: finalMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setShowQuickActions(false);
    simulateTyping();

    // Generate bot response
    setTimeout(() => {
      const response = getBotResponse(finalMessage, action);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.content,
        timestamp: new Date(),
        category: response.category,
        actions: response.actions
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    const actionTexts = {
      rti: 'I need help with RTI application',
      fir: 'I want to file a complaint or FIR',
      rights: 'Tell me about my legal rights',
      helpline: 'I need emergency help',
      case_mgmt: 'Help with case management',
      updates: 'Show me latest legal updates',
      schedule: 'Check court schedule',
      templates: 'I need document templates'
    };
    
    handleSendMessage(actionTexts[action], action);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const MessageComponent = ({ message }) => (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          message.type === 'user' 
            ? 'bg-blue-600 text-white ml-2' 
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white mr-2'
        }`}>
          {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
        </div>
        <div className={`rounded-2xl px-4 py-3 shadow-lg ${
          message.type === 'user'
            ? 'bg-blue-600 text-white rounded-br-md'
            : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
        }`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
          {message.actions && (
            <div className="flex flex-wrap gap-2 mt-3">
              {message.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(action)}
                  className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors border border-indigo-200"
                >
                  {action}
                </button>
              ))}
            </div>
          )}
          <div className="text-xs opacity-60 mt-2">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <Scale className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Justice Assistant</h1>
                <p className="text-sm text-gray-600">Department of Justice • Virtual Legal Support</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* User Type Selector */}
              <select 
                value={userType} 
                onChange={(e) => setUserType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="citizen">Citizen</option>
                <option value="lawyer">Lawyer</option>
                <option value="officer">Officer</option>
              </select>
              
              {/* Language Selector */}
              <select 
                value={selectedLanguage} 
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Menu size={18} className="mr-2" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions[userType].map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className="w-full flex items-center p-3 text-left rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 border border-indigo-100 group"
                  >
                    <action.icon size={18} className="text-indigo-600 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-gray-700">{action.text}</span>
                  </button>
                ))}
              </div>
              
              {/* Emergency Contact Card */}
              <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                  <Phone size={16} className="mr-2" />
                  Emergency
                </h4>
                <div className="text-sm text-red-700 space-y-1">
                  <div>Police: <strong>100</strong></div>
                  <div>Women: <strong>1091</strong></div>
                  <div>Legal Aid: <strong>15100</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <span className="font-medium text-white">AI Assistant Online</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleVoice}
                      className={`p-2 rounded-full transition-colors ${
                        isListening ? 'bg-red-100 text-red-600' : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                    </button>
                    <Volume2 className="text-white" size={16} />
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
                {messages.map((message) => (
                  <MessageComponent key={message.id} message={message} />
                ))}
                
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white mr-2 flex items-center justify-center">
                        <Bot size={16} />
                      </div>
                      <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-gray-200">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your legal query here... (e.g., 'How to file RTI?')"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-white"
                    />
                  </div>
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim()}
                    className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Send size={18} />
                  </button>
                </div>
                
                {/* Disclaimer */}
                <p className="text-xs text-gray-500 mt-2 text-center">
                  This AI assistant provides general legal information. For specific legal advice, consult a qualified lawyer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DOJChatbot;