# House Love - Cooperative Community Platform

A React-based web application designed to empower cooperative communities by providing tools for conflict mediation, resource sharing, and community building.

## 🏠 About

House Love is a platform that connects cooperative housing communities with:
- **Conflict Mediators**: Find qualified mediators for community disputes
- **Resource Sharing**: Share and discover community resources
- **Community Building**: Tools and resources for sustainable cooperative living

## 🚀 Features

- **Interactive Homepage**: Animated text and engaging user experience
- **Mediator Directory**: Browse and contact community mediators
- **Resource Library**: Access community resources and tools
- **Contact System**: Integrated EmailJS for seamless communication
- **Interactive Map**: Location-based services using Leaflet
- **Responsive Design**: Mobile-friendly interface
- **Google Sheets Integration**: Dynamic data management

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Routing**: React Router DOM 6.17.0
- **Styling**: SCSS with animations
- **Maps**: Leaflet with React Leaflet
- **Email**: EmailJS for contact forms
- **Data**: Google Sheets API integration
- **Icons**: FontAwesome
- **Animations**: GSAP, Animate.css

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Google Sheets API access
- EmailJS account

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd house-love
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```env
   REACT_APP_GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key_here
   REACT_APP_GOOGLE_SHEETS_DOC_ID=your_google_sheets_document_id_here
   REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key_here
   REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id_here
   REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_GOOGLE_SHEETS_API_KEY` | Google Sheets API key for data integration | Yes |
| `REACT_APP_GOOGLE_SHEETS_DOC_ID` | Google Sheets document ID | Yes |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | EmailJS public key for contact forms | Yes |
| `REACT_APP_EMAILJS_SERVICE_ID` | EmailJS service ID | Yes |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | EmailJS template ID | Yes |

## 📁 Project Structure

```
src/
├── components/
│   ├── About/           # About page component
│   ├── AnimatedLetters/ # Text animation component
│   ├── Contact/         # Contact page with form
│   ├── Home/           # Homepage component
│   ├── Layout/         # Main layout wrapper
│   ├── Mediators/      # Mediator directory
│   ├── Resources/      # Resource library
│   └── Sidebar/        # Navigation sidebar
├── assets/             # Images and static assets
├── App.js             # Main app component
├── App.scss           # Global styles
└── index.js           # App entry point
```

## 🧪 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 🔒 Security

- API keys are stored in environment variables
- Form validation and sanitization implemented
- HTTPS enforced in production
- Regular dependency updates for security patches

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email aaronlorenzowoods@gmail.com or create an issue in the repository.

## 🔄 Recent Updates

- Updated to React 18.2.0
- Improved error handling for contact forms
- Enhanced security with environment variables
- Added comprehensive documentation
- Fixed dependency vulnerabilities

---

**Built with ❤️ for cooperative communities**
