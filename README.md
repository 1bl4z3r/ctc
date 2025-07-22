# Click-To-Chat (CTC) - Multi-Platform Link Generator

A simple and user-friendly web application that generates **click-to-chat links** for WhatsApp, Telegram, and Signal without requiring users to save contact numbers first.

## 🚀 **Live Demo**
**Try it now:** [https://1bl4z3r.github.io/ctc/](https://1bl4z3r.github.io/ctc/)

## 📖 **What is Click-To-Chat?**

Click-To-Chat allows people to start conversations on messaging platforms instantly by clicking a link. Instead of manually saving phone numbers to contacts, users can simply click your generated link and begin chatting immediately.

**Perfect for:**
- Business customer support
- Marketing campaigns  
- Social media profiles
- Website contact buttons
- Email signatures
- QR codes for offline materials

## ✨ **Features**

- 🌍 **Multi-country support** - Comprehensive country code database
- 📱 **Three platforms** - WhatsApp, Telegram, and Signal link generation
- 💬 **Custom messages** - Pre-fill chat with default messages
- 📱 **Mobile-optimized** - Responsive design works on all devices
- 🔌 **Offline capable** - PWA functionality with offline caching
- 🆓 **Completely free** - No registration or payment required
- 🚀 **Instant generation** - Create links in seconds
- 📋 **Easy copying** - One-click copy to clipboard

## 🎯 **How to Use**

### **Basic Usage:**
1. **Visit** [https://1bl4z3r.github.io/ctc/](https://1bl4z3r.github.io/ctc/)
2. **Select** your country from the dropdown
3. **Enter** your phone number (without country code)
4. **Click** the platform button (WhatsApp/Telegram/Signal)
5. **Copy** the generated link and share it anywhere!

### **Generated Link Examples:**
```
WhatsApp: https://wa.me/1234567890
Telegram: https://t.me/1234567890  
Signal: https://signal.me/#p/+1234567890
```

### **With Custom Messages:**
Add `?text=` parameter to include pre-filled messages:
```
https://wa.me/1234567890?text=Hello!%20I%20need%20help%20with...
```

## 🛠 **For Developers**

### **Local Development**
```bash
git clone https://github.com/1bl4z3r/ctc.git
cd ctc
# Open index.html in your browser or serve with a local server
python -m http.server 8000  # Python
# OR
npx serve .                 # Node.js
```

### **Project Structure**
```
ctc/
├── index.html        # Main application
├── offline.html      # Offline support
├── index.css         # CSS
├── index.js          # JavaScript
├── identity/         # Images and icons
├── CountryCodes.json # Country codes JSON
└── site.webmanifest  # PWA configuration
```

### **Technical Details**
- **Frontend:** Pure HTML, CSS, JavaScript
- **PWA:** Service Worker for offline functionality
- **Data:** JSON-based country code database
- **APIs:** Uses official messaging platform URL schemes

## 🌐 **Platform Support**

| Platform | URL Format | Custom Messages |
|----------|------------|-----------------|
| WhatsApp | `wa.me/number` | ✅ Supported |
| Telegram | `t.me/number` | ✅ Supported |  
| Signal | `signal.me/#p/+number` | ✅ Supported |

## 📱 **Use Cases & Examples**

### **For Businesses:**
- Add to website contact pages
- Include in email signatures
- Create QR codes for business cards
- Use in social media profiles

### **For Developers:**
- Embed in customer support widgets
- Integration with contact forms
- API endpoints for link generation
- Mobile app deep linking

### **For Marketers:**
- Campaign landing pages
- Social media advertising
- Print marketing materials
- Event networking

## 🤝 **Contributing**

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Ideas for Contributions:**
- Add more messaging platforms
- Improve UI/UX design
- Add new features (QR code generation, bulk link creation)
- Bug fixes and optimizations
- Documentation improvements
- Translations for other languages

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

## 🔗 **Related Resources**

- [WhatsApp Click-to-Chat API Documentation](https://faq.whatsapp.com/5913398998672934)
- [Telegram URL Schemes](https://core.telegram.org/api/links)
- [Signal Link Documentation](https://signal.org/blog/signal-links/)

## 📞 **Support & Contact**

- **GitHub Issues:** [Report bugs or request features](https://github.com/1bl4z3r/ctc/issues)
- **Developer:** [@1bl4z3r](https://github.com/1bl4z3r)