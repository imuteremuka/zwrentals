# Rental Marketplace MVP Project Plan

## Executive Summary
**Timeline:** 6-8 weeks  
**Budget:** ~$5,000  
**Target Market:** Zimbabwe (mobile-first)  
**Strategic Focus:** Data collection for future financial services

---

## Phase 1: Foundation (Weeks 1-2)

### Technology Stack Decisions

#### Frontend
- **Framework:** Next.js 14 (React-based)
- **Styling:** TailwindCSS
- **UI Components:** shadcn/ui
- **Deployment:** AWS Amplify
- **Rationale:** Single codebase, mobile-responsive, fast development, AWS integration

#### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Deployment:** AWS Lambda + API Gateway
- **Authentication:** AWS Cognito (phone/SMS)
- **Rationale:** Serverless, pay-per-use, auto-scaling, AWS integration

#### Database & Storage
- **Database:** Amazon RDS PostgreSQL (serverless)
- **Image Storage:** Amazon S3
- **File Upload:** AWS SDK + S3 presigned URLs
- **Rationale:** Reliable, scalable, cost-effective, AWS native

#### External Services
- **SMS:** AWS SNS (Simple Notification Service)
- **Payments:** Stripe (initial), EcoCash integration (Phase 2)
- **Email:** AWS SES (Simple Email Service)

### Project Structure
```
rental-marketplace/
├── frontend/          # Next.js app
├── backend/           # Express.js API
├── database/          # PostgreSQL schema
├── admin/             # React Admin dashboard
└── docs/              # Documentation
```

---

## Phase 2: Core Development (Weeks 3-5)

### Database Schema Design

#### Core Tables
```sql
-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255),
    role ENUM('tenant', 'landlord') NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Properties Table
CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    landlord_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    rent_amount DECIMAL(10,2) NOT NULL,
    house_type VARCHAR(100),
    bedrooms INTEGER,
    bathrooms INTEGER,
    description TEXT,
    images JSONB,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER REFERENCES users(id),
    property_id INTEGER REFERENCES properties(id),
    viewing_date TIMESTAMP,
    status ENUM('requested', 'confirmed', 'cancelled') DEFAULT 'requested',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Messages Table
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    receiver_id INTEGER REFERENCES users(id),
    property_id INTEGER REFERENCES properties(id),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### API Endpoints Design

#### Authentication
- `POST /api/auth/send-otp` - Send SMS verification
- `POST /api/auth/verify-otp` - Verify phone number
- `POST /api/auth/register` - Complete registration
- `GET /api/auth/profile` - Get user profile

#### Properties
- `GET /api/properties` - List properties (with filters)
- `POST /api/properties` - Create property listing
- `GET /api/properties/:id` - Get property details
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

#### Bookings
- `POST /api/bookings` - Request viewing
- `GET /api/bookings/tenant/:id` - Tenant's bookings
- `GET /api/bookings/landlord/:id` - Landlord's bookings
- `PUT /api/bookings/:id` - Update booking status

#### Messages
- `GET /api/messages/:userId` - Get conversation
- `POST /api/messages` - Send message

---

## Phase 3: Feature Implementation (Weeks 6-7)

### MVP Feature Implementation Priority

#### Week 6: Core Features
1. **User Authentication**
   - Phone number registration
   - SMS verification
   - Profile creation

2. **Property Management**
   - Property listing form
   - Image upload (Cloudinary)
   - Property details page

3. **Search & Discovery**
   - Property search with filters
   - Location-based search
   - Property categories

#### Week 7: User Interaction
1. **Booking System**
   - Viewing request form
   - Booking confirmation
   - Calendar integration

2. **Messaging System**
   - In-app messaging
   - SMS notifications
   - Message history

3. **Admin Dashboard**
   - Property approval queue
   - User management
   - Reporting analytics

---

## Phase 4: Testing & Launch (Week 8)

### Testing Strategy
- **Unit Tests:** Jest for backend logic
- **Integration Tests:** API endpoint testing
- **E2E Tests:** Playwright for critical user flows
- **Performance Testing:** Mobile responsiveness

### Launch Checklist
- [ ] Domain setup and SSL
- [ ] Production database migration
- [ ] SMS service configuration
- [ ] Payment gateway setup
- [ ] Admin user creation
- [ ] Beta testing with 20 users
- [ ] Performance optimization
- [ ] Security audit

---

## Infrastructure & Deployment

### Hosting Architecture
```
Frontend (Next.js) → AWS Amplify ($0-20/month)
Backend API → AWS Lambda + API Gateway ($15-30/month)
Database → Amazon RDS PostgreSQL Serverless ($20-40/month)
Storage → Amazon S3 ($10-20/month)
SMS → AWS SNS ($10-15/month)
Email → AWS SES ($1-5/month)
Domain + Certificate → AWS Route 53 ($10/month)
Total Monthly Cost: ~$66-140
```

### AWS Services Breakdown
- **AWS Amplify:** Static frontend hosting with CI/CD
- **AWS Lambda:** Serverless backend functions
- **API Gateway:** REST API management and routing
- **Amazon RDS Serverless:** PostgreSQL database with auto-scaling
- **Amazon S3:** Object storage for property images
- **AWS Cognito:** User authentication and authorization
- **AWS SNS:** SMS notifications and messaging
- **AWS SES:** Transactional email service
- **AWS Route 53:** DNS management and domain registration

### Environment Configuration
- **Development:** Local AWS SAM CLI + Docker
- **Staging:** Separate AWS account with reduced resources
- **Production:** Full AWS infrastructure with monitoring

---

## Budget Breakdown

### Development Costs
| Item | Cost | Notes |
|------|------|-------|
| Frontend Development | $2,000 | 2 weeks developer |
| Backend Development | $2,500 | 2.5 weeks developer |
| Database Setup | $500 | Schema design + migration |
| Testing & QA | $500 | Unit + E2E tests |
| **Development Total** | **$5,500** | |

### Monthly Operating Costs
| Service | Monthly Cost | AWS Service |
|---------|-------------|-------------|
| Frontend Hosting | $0-20 | AWS Amplify |
| Backend API | $15-30 | AWS Lambda + API Gateway |
| Database | $20-40 | Amazon RDS Serverless |
| Storage | $10-20 | Amazon S3 |
| SMS | $10-15 | AWS SNS |
| Email | $1-5 | AWS SES |
| Domain + DNS | $10 | AWS Route 53 |
| **Monthly Total** | **$66-140** | |

### AWS Free Tier Benefits (First 12 Months)
- **Lambda:** 1M requests/month free
- **API Gateway:** 1M API calls/month free
- **S3:** 5GB storage free
- **RDS:** 750 hours/month free (t2.micro)
- **SES:** 62,000 emails/month free
- **SNS:** 1M notifications/month free

**Effective Monthly Cost (Year 1):** ~$30-60

---

## Risk Mitigation

### Technical Risks
- **SMS Delivery:** AWS SNS with backup SMS provider
- **Payment Integration:** Start with Stripe, add EcoCash later
- **Image Storage:** Amazon S3 with CloudFront CDN for faster loading
- **Lambda Cold Starts:** Use provisioned concurrency for critical functions
- **Database Performance:** Implement connection pooling and caching

### Business Risks
- **User Adoption:** Launch with 100+ verified properties
- **Fake Listings:** Manual verification process
- **Competition:** Focus on Zimbabwe-specific features

---

## Success Metrics

### Launch Targets (First 3 Months)
- **User Registration:** 500+ users
- **Property Listings:** 200+ verified properties
- **Booking Requests:** 100+ viewing requests
- **User Retention:** 60% monthly active users

### Technical KPIs
- **Page Load Time:** <3 seconds on mobile
- **Uptime:** 99.5%
- **API Response Time:** <500ms
- **Mobile Responsiveness:** 100% compatibility

---

## Future Roadmap

### Phase 2 (Months 4-6)
- Mobile app development (React Native)
- EcoCash payment integration
- Advanced search filters
- Property verification badges

### Phase 3 (Months 7-12)
- Rent payment processing
- Tenant screening services
- Mortgage marketplace integration
- Data analytics dashboard for banks

### Phase 4 (Year 2+)
- AI-powered property recommendations
- Virtual property tours
- Legal document generation
- Expansion to neighboring countries

---

## Strategic Data Collection Plan

### High-Value Data Points
1. **Rental Market Data**
   - Average rent by location
   - Property type demand
   - Seasonal rental patterns

2. **Financial Behavior Data**
   - Payment history
   - Rent affordability ratios
   - Tenant employment patterns

3. **Market Intelligence**
   - Housing demand hotspots
   - Development opportunities
   - Investment yield analysis

### Monetization Strategy
- **Year 1:** Focus on user growth and data collection
- **Year 2:** Sell anonymized data insights to banks
- **Year 3:** Premium services for landlords and property managers

---

## Conclusion

This MVP plan prioritizes speed-to-market while building a foundation for long-term data monetization. The mobile-first approach addresses Zimbabwe's market reality, and the phased rollout allows for iterative improvement based on user feedback.

**Key Success Factors:**
1. Simple, mobile-optimized user experience
2. Robust property verification system
3. Strategic data collection from day one
4. Lean operational costs
5. Clear path to financial data monetization

The 6-8 week timeline is achievable with focused development and prioritization of core features over nice-to-have functionality.
