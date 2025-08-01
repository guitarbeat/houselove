import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Plus, Trash2, Download, Calendar, Clock, MapPin, Users, Eye, EyeOff, Copy, Check } from 'lucide-react'
import './App.css'

function App() {
  const [showPreview, setShowPreview] = useState(true)
  const [copied, setCopied] = useState(false)
  
  const [meetingDetails, setMeetingDetails] = useState({
    date: '',
    time: '',
    location: '',
    meetLink: '',
    callToOrderPresenter: '',
    callToOrderTime: '5',
    agendaPresenter: '',
    agendaTime: '5',
    minutesPresenter: '',
    minutesTime: '5',
    previousMeetings: ['']
  })

  const [topics, setTopics] = useState([
    { title: '', presenter: '', time: '', description: '' }
  ])

  const [openTimePresenter, setOpenTimePresenter] = useState('All')
  const [openTimeTime, setOpenTimeTime] = useState('10')
  const [adjournPresenter, setAdjournPresenter] = useState('')

  const addTopic = () => {
    setTopics([...topics, { title: '', presenter: '', time: '', description: '' }])
  }

  const removeTopic = (index) => {
    setTopics(topics.filter((_, i) => i !== index))
  }

  const updateTopic = (index, field, value) => {
    const newTopics = [...topics]
    newTopics[index][field] = value
    setTopics(newTopics)
  }

  const addPreviousMeeting = () => {
    setMeetingDetails({
      ...meetingDetails,
      previousMeetings: [...meetingDetails.previousMeetings, '']
    })
  }

  const removePreviousMeeting = (index) => {
    const newMeetings = meetingDetails.previousMeetings.filter((_, i) => i !== index)
    setMeetingDetails({
      ...meetingDetails,
      previousMeetings: newMeetings
    })
  }

  const updatePreviousMeeting = (index, value) => {
    const newMeetings = [...meetingDetails.previousMeetings]
    newMeetings[index] = value
    setMeetingDetails({
      ...meetingDetails,
      previousMeetings: newMeetings
    })
  }

  const generateAgenda = () => {
    let agenda = `# Board of Directors Meeting Agenda

## Meeting Details

* **Date:** ${meetingDetails.date || '[Date]'}
* **Time:** ${meetingDetails.time || '[Time]'}
* **Location:** ${meetingDetails.location || '[In-person Location]'} / Online: ${meetingDetails.meetLink || '[Google Meet Link]'}
* *Note: Times are estimations and are subject to change*

## Meeting Starts

* **Call to Order & Roll Call:** ${meetingDetails.callToOrderPresenter || '[Presenter Name]'} (${meetingDetails.callToOrderTime} minutes)
* **Review & Approve Agenda:** ${meetingDetails.agendaPresenter || '[Presenter Name]'} (${meetingDetails.agendaTime} minutes)
* **Approve Meeting Minutes from Past Meeting(s):**`

    meetingDetails.previousMeetings.forEach(meeting => {
      if (meeting.trim()) {
        agenda += `\n  * ${meeting} Minutes`
      }
    })

    if (meetingDetails.previousMeetings.every(meeting => !meeting.trim())) {
      agenda += `\n  * [Previous Meeting Date] Minutes`
    }

    agenda += `\n\n## Updates & Topics\n`

    if (topics.some(topic => topic.title.trim())) {
      topics.forEach(topic => {
        if (topic.title.trim()) {
          agenda += `\n* **${topic.title}:** ${topic.presenter || '[Presenter Name]'} (${topic.time || '[Time]'} minutes)`
          if (topic.description.trim()) {
            agenda += `\n  * ${topic.description}`
          }
        }
      })
    } else {
      agenda += `\n* **[Topic Title]:** [Presenter Name] ([Time] minutes)
  * [Brief description or key points for this topic]`
    }

    agenda += `\n\n## Open Time

* **Community Comments, Questions, or Concerns:** ${openTimePresenter} (${openTimeTime} minutes)

## Meeting Conclusion

* **Motion to Adjourn the Meeting:** ${adjournPresenter || '[Presenter Name]'}
* **Meeting Adjourned**

*Note: If attendees are interested in extending the conversation after adjourning, that can be arranged with respect to New Guild member's time and space.*`

    return agenda
  }

  const downloadAgenda = () => {
    const agenda = generateAgenda()
    const blob = new Blob([agenda], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `BOD_Meeting_Agenda_${meetingDetails.date.replace(/[\/\-]/g, '_') || 'Draft'}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateAgenda())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '[Date]'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ICC Austin Board Meeting Agenda Generator
          </h1>
          <p className="text-gray-600">
            Create professional board meeting agendas with live preview
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Meeting Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Meeting Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={meetingDetails.date}
                      onChange={(e) => setMeetingDetails({...meetingDetails, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      placeholder="e.g., 6:30-8:30 pm"
                      value={meetingDetails.time}
                      onChange={(e) => setMeetingDetails({...meetingDetails, time: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">In-person Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., New Guild Conference Room"
                    value={meetingDetails.location}
                    onChange={(e) => setMeetingDetails({...meetingDetails, location: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="meetLink">Google Meet Link</Label>
                  <Input
                    id="meetLink"
                    placeholder="e.g., meet.google.com/onr-eygc-gzi"
                    value={meetingDetails.meetLink}
                    onChange={(e) => setMeetingDetails({...meetingDetails, meetLink: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Meeting Start Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Meeting Start
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="callPresenter">Call to Order Presenter</Label>
                    <Input
                      id="callPresenter"
                      placeholder="e.g., Aaron and Angel"
                      value={meetingDetails.callToOrderPresenter}
                      onChange={(e) => setMeetingDetails({...meetingDetails, callToOrderPresenter: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="callTime">Time (minutes)</Label>
                    <Input
                      id="callTime"
                      type="number"
                      value={meetingDetails.callToOrderTime}
                      onChange={(e) => setMeetingDetails({...meetingDetails, callToOrderTime: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="agendaPresenter">Agenda Review Presenter</Label>
                    <Input
                      id="agendaPresenter"
                      placeholder="e.g., Aaron and Angel"
                      value={meetingDetails.agendaPresenter}
                      onChange={(e) => setMeetingDetails({...meetingDetails, agendaPresenter: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="agendaTime">Time (minutes)</Label>
                    <Input
                      id="agendaTime"
                      type="number"
                      value={meetingDetails.agendaTime}
                      onChange={(e) => setMeetingDetails({...meetingDetails, agendaTime: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label>Previous Meeting Minutes to Approve</Label>
                  {meetingDetails.previousMeetings.map((meeting, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        placeholder="e.g., 6/10/2025 BOD Meeting"
                        value={meeting}
                        onChange={(e) => updatePreviousMeeting(index, e.target.value)}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removePreviousMeeting(index)}
                        disabled={meetingDetails.previousMeetings.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addPreviousMeeting}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Previous Meeting
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Topics Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Updates & Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topics.map((topic, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Topic {index + 1}</h4>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeTopic(index)}
                        disabled={topics.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <Label>Topic Title</Label>
                        <Input
                          placeholder="e.g., PIP Status & Performance Report"
                          value={topic.title}
                          onChange={(e) => updateTopic(index, 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Presenter</Label>
                        <Input
                          placeholder="e.g., Nick (ED)"
                          value={topic.presenter}
                          onChange={(e) => updateTopic(index, 'presenter', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Time (minutes)</Label>
                        <Input
                          type="number"
                          placeholder="25"
                          value={topic.time}
                          onChange={(e) => updateTopic(index, 'time', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Description/Key Points</Label>
                      <Textarea
                        placeholder="Brief description or key points for this topic"
                        value={topic.description}
                        onChange={(e) => updateTopic(index, 'description', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
                <Button onClick={addTopic} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Topic
                </Button>
              </CardContent>
            </Card>

            {/* Open Time & Conclusion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Open Time & Conclusion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="openPresenter">Open Time Presenter</Label>
                    <Input
                      id="openPresenter"
                      value={openTimePresenter}
                      onChange={(e) => setOpenTimePresenter(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="openTime">Time (minutes)</Label>
                    <Input
                      id="openTime"
                      type="number"
                      value={openTimeTime}
                      onChange={(e) => setOpenTimeTime(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="adjournPresenter">Motion to Adjourn Presenter</Label>
                  <Input
                    id="adjournPresenter"
                    placeholder="e.g., Aaron"
                    value={adjournPresenter}
                    onChange={(e) => setAdjournPresenter(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={downloadAgenda} size="lg" className="flex-1">
                <Download className="h-5 w-5 mr-2" />
                Download Agenda
              </Button>
              <Button onClick={copyToClipboard} variant="outline" size="lg" className="flex-1">
                {copied ? <Check className="h-5 w-5 mr-2" /> : <Copy className="h-5 w-5 mr-2" />}
                {copied ? 'Copied!' : 'Copy Text'}
              </Button>
            </div>
          </div>

          {/* Live Preview Section */}
          <div className="lg:sticky lg:top-4">
            <Card className="h-fit">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Live Preview
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              {showPreview && (
                <CardContent>
                  <div className="bg-white border rounded-lg p-4 max-h-[600px] overflow-y-auto">
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                        {generateAgenda()}
                      </pre>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    <p><strong>Meeting Date:</strong> {formatDate(meetingDetails.date)}</p>
                    <p><strong>Total Topics:</strong> {topics.filter(t => t.title.trim()).length}</p>
                    <p><strong>Estimated Duration:</strong> {
                      parseInt(meetingDetails.callToOrderTime || 0) + 
                      parseInt(meetingDetails.agendaTime || 0) + 
                      topics.reduce((sum, topic) => sum + parseInt(topic.time || 0), 0) + 
                      parseInt(openTimeTime || 0)
                    } minutes</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

