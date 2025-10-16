-- Fix security vulnerabilities in chat system

-- 1. Update chat_conversations RLS policy to prevent anonymous conversation exposure
DROP POLICY IF EXISTS "Users view own conversations" ON chat_conversations;
CREATE POLICY "Users view own conversations"
ON chat_conversations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 2. Create policy for anonymous users to view only their own conversations
CREATE POLICY "Anonymous users view their conversations"
ON chat_conversations
FOR SELECT
TO anon
USING (user_id IS NULL);

-- 3. Update chat_messages RLS policy to prevent public access to conversations
DROP POLICY IF EXISTS "Users view conversation messages" ON chat_messages;
CREATE POLICY "Users view conversation messages"
ON chat_messages
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM chat_conversations
    WHERE chat_conversations.id = chat_messages.conversation_id
      AND chat_conversations.user_id = auth.uid()
  )
);

-- 4. Create policy for anonymous users to view only their conversation messages
CREATE POLICY "Anonymous view their conversation messages"
ON chat_messages
FOR SELECT
TO anon
USING (
  EXISTS (
    SELECT 1
    FROM chat_conversations
    WHERE chat_conversations.id = chat_messages.conversation_id
      AND chat_conversations.user_id IS NULL
  )
);

-- 5. Add input validation - limit message lengths to prevent DoS attacks
ALTER TABLE chat_messages 
ADD CONSTRAINT chat_messages_content_length 
CHECK (char_length(content) <= 5000);

ALTER TABLE contact_messages 
ADD CONSTRAINT contact_messages_message_length 
CHECK (char_length(message) <= 5000);

ALTER TABLE contact_messages 
ADD CONSTRAINT contact_messages_name_length 
CHECK (char_length(name) <= 200);

ALTER TABLE contact_messages 
ADD CONSTRAINT contact_messages_email_length 
CHECK (char_length(email) <= 255);

ALTER TABLE inquiries 
ADD CONSTRAINT inquiries_message_length 
CHECK (char_length(message) <= 5000);

ALTER TABLE inquiries 
ADD CONSTRAINT inquiries_name_length 
CHECK (char_length(name) <= 200);